import { ReactNode } from 'react';
import { Code, Pencil, Database, Globe, BarChart } from 'lucide-react';

export interface ProjectTag {
  name: string;
  bgColor: string;
  textColor: string;
}

export interface Project {
  title: string;
  description: string;
  icon: ReactNode;
  bgFrom: string;
  bgTo: string;
  tags: ProjectTag[];
}

export const dummyProjects: Project[] = [
  {
    title: "AI 기반 데이터 분석 플랫폼",
    description: "머신러닝을 활용한 데이터 분석과 시각화를 위한 웹 애플리케이션",
    icon: <Code className="w-16 h-16" />,
    bgFrom: "from-blue-900",
    bgTo: "to-purple-900",
    tags: [
      { name: "React", bgColor: "bg-blue-500/20", textColor: "text-blue-300" },
      { name: "TensorFlow", bgColor: "bg-green-500/20", textColor: "text-green-300" },
      { name: "Python", bgColor: "bg-purple-500/20", textColor: "text-purple-300" }
    ]
  },
  {
    title: "분산 시스템 모니터링 대시보드",
    description: "실시간 시스템 모니터링을 위한 확장 가능한 대시보드 솔루션",
    icon: <BarChart className="w-16 h-16" />,
    bgFrom: "from-green-900",
    bgTo: "to-blue-900",
    tags: [
      { name: "Next.js", bgColor: "bg-cyan-500/20", textColor: "text-cyan-300" },
      { name: "GraphQL", bgColor: "bg-orange-500/20", textColor: "text-orange-300" },
      { name: "TypeScript", bgColor: "bg-blue-500/20", textColor: "text-blue-300" }
    ]
  },
  {
    title: "블록체인 기반 인증 시스템",
    description: "분산 원장 기술을 활용한 안전한 사용자 인증 및 권한 관리 시스템",
    icon: <Database className="w-16 h-16" />,
    bgFrom: "from-purple-900",
    bgTo: "to-red-900",
    tags: [
      { name: "Solidity", bgColor: "bg-gray-500/20", textColor: "text-gray-300" },
      { name: "Web3.js", bgColor: "bg-yellow-500/20", textColor: "text-yellow-300" },
      { name: "Node.js", bgColor: "bg-green-500/20", textColor: "text-green-300" }
    ]
  },
  {
    title: "클라우드 네이티브 애플리케이션",
    description: "컨테이너화된 마이크로서비스 아키텍처 기반의 확장 가능한 웹 서비스",
    icon: <Globe className="w-16 h-16" />,
    bgFrom: "from-blue-900",
    bgTo: "to-cyan-900",
    tags: [
      { name: "Docker", bgColor: "bg-blue-500/20", textColor: "text-blue-300" },
      { name: "Kubernetes", bgColor: "bg-indigo-500/20", textColor: "text-indigo-300" },
      { name: "Go", bgColor: "bg-cyan-500/20", textColor: "text-cyan-300" }
    ]
  },
  {
    title: "IoT 데이터 수집 플랫폼",
    description: "다양한 IoT 디바이스로부터 데이터를 수집하고 분석하는 통합 플랫폼",
    icon: <Code className="w-16 h-16" />,
    bgFrom: "from-emerald-900",
    bgTo: "to-indigo-900",
    tags: [
      { name: "MQTT", bgColor: "bg-red-500/20", textColor: "text-red-300" },
      { name: "AWS IoT", bgColor: "bg-orange-500/20", textColor: "text-orange-300" },
      { name: "Rust", bgColor: "bg-gray-500/20", textColor: "text-gray-300" }
    ]
  },
  {
    title: "AI 챗봇 커스텀 서비스",
    description: "기업별 맞춤형 대화형 AI 솔루션을 구축하고 배포하는 서비스",
    icon: <Pencil className="w-16 h-16" />,
    bgFrom: "from-violet-900",
    bgTo: "to-fuchsia-900",
    tags: [
      { name: "NLP", bgColor: "bg-purple-500/20", textColor: "text-purple-300" },
      { name: "FastAPI", bgColor: "bg-green-500/20", textColor: "text-green-300" },
      { name: "Vue.js", bgColor: "bg-emerald-500/20", textColor: "text-emerald-300" }
    ]
  }
];
