'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, ArrowLeft, Share2 } from 'lucide-react';
import { useState } from 'react';
import { getAllPrompts } from '@/lib/prompts/data';
import { useToast } from '@/hooks/use-toast';

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const allPrompts = getAllPrompts();
  const prompt = allPrompts.find(p => p.id === params.id);

  if (!prompt) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Prompt không tồn tại</h1>
          <Button onClick={() => router.push('/prompts')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast({
        title: "Đã sao chép!",
        description: "Prompt đã được sao chép vào clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép prompt. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: prompt.description,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Đã sao chép link!",
          description: "Link đã được sao chép vào clipboard.",
        });
      }
    } catch (error) {
      // User cancelled share or error occurred
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {prompt.description}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary-100 text-primary-700">
                {prompt.category === 'image' ? 'Ảnh' : 'Văn phòng'}
              </Badge>
              {prompt.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900">Prompt</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm hover:bg-slate-100"
                    aria-label="Copy prompt"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                  <p className="text-slate-800 font-mono text-sm leading-relaxed whitespace-pre-wrap pr-12">
                    {prompt.prompt}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleCopy}
                    className="flex-1"
                    size="lg"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Đã sao chép!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Sao chép Prompt
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="lg"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="mt-6 bg-gradient-to-br from-primary-50 to-indigo-50 border-primary-200">
              <CardHeader>
                <h3 className="text-lg font-semibold text-slate-900">💡 Mẹo sử dụng</h3>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-700">
                <p>• Có thể điều chỉnh prompt theo nhu cầu của bạn</p>
                <p>• Thử nghiệm với các AI models khác nhau để có kết quả tốt nhất</p>
                <p>• Thêm hoặc bớt chi tiết để tùy chỉnh output</p>
                <p>• Kết hợp với negative prompts để loại bỏ yếu tố không mong muốn</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
