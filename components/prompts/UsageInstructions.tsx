import { Lightbulb } from 'lucide-react';
import { PromptCategory } from '@/lib/prompts/types';

interface UsageInstructionsProps {
  category: PromptCategory;
  className?: string;
}

const instructions: Record<PromptCategory, string[]> = {
  image: [
    'Mở ChatGPT, Midjourney, hoặc DALL-E',
    'Copy prompt và paste vào công cụ',
    'Upload ảnh gốc nếu cần (cho edit prompt)',
    'Tùy chỉnh tham số theo ý muốn',
    'Generate và tải ảnh về',
  ],
  office: [
    'Mở ChatGPT hoặc AI assistant khác',
    'Copy prompt và paste vào chat',
    'Thay thế [placeholder] bằng nội dung của bạn',
    'Nhấn Enter và chờ kết quả',
    'Chỉnh sửa kết quả nếu cần',
  ],
  assistant: [
    'Mở ChatGPT hoặc AI assistant khác',
    'Copy prompt và paste vào chat',
    'Điền thông tin vào các phần [trong ngoặc]',
    'Nhấn Enter và tương tác với AI',
    'Tiếp tục hỏi thêm nếu cần',
  ],
};

export function UsageInstructions({
  category,
  className,
}: UsageInstructionsProps) {
  const steps = instructions[category] || instructions.assistant;

  return (
    <section className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-bold text-slate-900">Cách Sử Dụng</h2>
      </div>
      <ol className="space-y-2 text-slate-600">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
