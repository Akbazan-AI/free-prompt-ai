'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Lightbulb, Target, Zap, CheckCircle2 } from 'lucide-react';

export default function GuidesPage() {
  const guides = [
    {
      icon: BookOpen,
      title: "Giới thiệu về Prompts",
      description: "Tìm hiểu cơ bản về prompts và cách sử dụng chúng hiệu quả",
      tips: [
        "Prompt là gì và tại sao quan trọng",
        "Các loại prompts phổ biến",
        "Cách đọc và hiểu cấu trúc prompt",
      ]
    },
    {
      icon: Lightbulb,
      title: "Viết Prompts Hiệu Quả",
      description: "Bí quyết để tạo ra những prompts chất lượng cao",
      tips: [
        "Sử dụng ngôn ngữ mô tả cụ thể",
        "Thêm chi tiết về phong cách, màu sắc, ánh sáng",
        "Sử dụng từ khóa kỹ thuật (4K, detailed, cinematic...)",
        "Thử nghiệm và tinh chỉnh prompts",
      ]
    },
    {
      icon: Target,
      title: "Tối Ưu Kết Quả",
      description: "Làm thế nào để có được kết quả tốt nhất từ AI",
      tips: [
        "Bắt đầu với prompts đơn giản, sau đó thêm chi tiết",
        "Sử dụng negative prompts để loại bỏ yếu tố không mong muốn",
        "Kết hợp nhiều style và kỹ thuật",
        "Lưu lại các prompts hiệu quả để tái sử dụng",
      ]
    },
    {
      icon: Zap,
      title: "Tips & Tricks",
      description: "Mẹo hay từ cộng đồng và chuyên gia",
      tips: [
        "Thử các AI models khác nhau (Midjourney, DALL-E, Stable Diffusion)",
        "Tham gia cộng đồng để học hỏi prompts mới",
        "Bookmark prompts yêu thích để dễ tìm lại",
        "Chia sẻ prompts của bạn với cộng đồng",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Hướng Dẫn Sử Dụng Prompts
            </h1>
            <p className="text-lg text-slate-600">
              Học cách viết và tối ưu prompts để có kết quả tốt nhất từ AI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guides Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-slate-200">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {guide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {guide.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-primary-50 to-indigo-50 border-primary-200">
              <CardHeader>
                <CardTitle className="text-2xl">Tài Nguyên Bổ Sung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">
                  Để học thêm về prompts và AI image generation, tham khảo:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span><strong>Midjourney Documentation:</strong> Hướng dẫn chi tiết về cách viết prompts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span><strong>OpenAI DALL-E Guide:</strong> Tips từ OpenAI về prompt engineering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span><strong>Prompt Communities:</strong> Reddit, Discord để học hỏi từ cộng đồng</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
