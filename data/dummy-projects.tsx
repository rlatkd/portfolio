import { ReactNode } from 'react';
import { CreditCard, Users, ShoppingBag, MessageSquare, LineChart, Database, LayoutGrid, Image, Globe, Server, Briefcase, Shirt } from 'lucide-react';

export interface ProjectTag {
  name: string;
  className: string;
}

export interface Project {
  title: string;
  description: string;
  icon: ReactNode;
  tags: ProjectTag[];
}

export const dummyProjects: Project[] = [
  {
    title: "자동 청구/결제 솔루션",
    description: "기업을 위한 자동화된 결제 및 청구 시스템으로, 구독 관리와 결제 프로세스를 간소화",
    icon: <CreditCard className="w-16 h-16" />,
    tags: [
      { name: "Spring Boot", className: "text-white font-medium border rounded-full" },
      { name: "JPA", className: "text-white font-medium border rounded-full" },
      { name: "QueryDSL", className: "text-white font-medium border rounded-full" },
      { name: "Kafka", className: "text-white font-medium border rounded-full" },
      { name: "Elasticsearch", className: "text-white font-medium border rounded-full" },
      { name: "React", className: "text-white font-medium border rounded-full" },
      { name: "ECS", className: "text-white font-medium border rounded-full" },
    ]
  },
  {
    title: "MSA 기반 웹 POS 서비스",
    description: "마이크로서비스 아키텍처를 활용한 웹 기반 POS 시스템으로 매장 운영 효율화",
    icon: <ShoppingBag className="w-16 h-16" />,
    tags: [
      { name: "React", className: "text-white font-medium border rounded-full" },
      { name: "styled-components", className: "text-white font-medium border rounded-full" },
      { name: "recoil", className: "text-white font-medium border rounded-full" },
      { name: "S3", className: "text-white font-medium border rounded-full" },
      { name: "CloudFront", className: "text-white font-medium border rounded-full" },
      { name: "Route53", className: "text-white font-medium border rounded-full" },
      { name: "ACM", className: "text-white font-medium border rounded-full" },
      { name: "WAF", className: "text-white font-medium border rounded-full" },
    ]
  },
  {
    title: "X-Operations",
    description: "개발 진행 중인 통합 운영 관리 플랫폼으로 비즈니스 프로세스 자동화 구현",
    icon: <Server className="w-16 h-16" />,
    tags: [
      { name: "Nextjs", className: "text-white font-medium border rounded-full" },
      { name: "TypeScript", className: "text-white font-medium border rounded-full" },
      { name: "MongoDB", className: "text-white font-medium border rounded-full" }
    ]
  },
  {
    title: "풋살 자동 매칭 서비스",
    description: "풋살 팀과 플레이어를 자동으로 매칭해주는 서비스로 스포츠 활동 참여 촉진",
    icon: <Users className="w-16 h-16" />,
    tags: [
      { name: "Spring Boot", className: "text-white font-medium border rounded-full" },
      { name: "Oracle Cloud", className: "text-white font-medium border rounded-full" },
      { name: "Mybatis", className: "text-white font-medium border rounded-full" },
      { name: "Kakao API", className: "text-white font-medium border rounded-full" },
      { name: "GitLab Runner", className: "text-white font-medium border rounded-full" },
      { name: "EC2", className: "text-white font-medium border rounded-full" },
      { name: "S3", className: "text-white font-medium border rounded-full" },
    ]
  },
  {
    title: "인터넷 뱅킹 시스템",
    description: "안전하고 효율적인 온라인 뱅킹 서비스를 제공하는 종합 금융 플랫폼",
    icon: <Briefcase className="w-16 h-16" />,
    tags: [
      { name: "Java", className: "text-white font-medium border rounded-full" },
    ]
  },
  {
    title: "중고 경매 플랫폼 v0",
    description: "중고 물품을 경매 방식으로 거래할 수 있는 온라인 플랫폼의 초기 버전",
    icon: <Database className="w-16 h-16" />,
    tags: [
      { name: "Flask", className: "text-white font-medium border rounded-full" },
      { name: "MySQL", className: "text-white font-medium border rounded-full" },
      { name: "React", className: "text-white font-medium border rounded-full" }
    ]
  },
  {
    title: "패션 커뮤니티",
    description: "패션 애호가들이 스타일과 정보를 공유하고 소통할 수 있는 커뮤니티 플랫폼",
    icon: <Shirt className="w-16 h-16" />,
    tags: [
      { name: "Flask", className: "text-white font-medium border rounded-full" },
      { name: "MySQL", className: "text-white font-medium border rounded-full" },
      { name: "SSR", className: "text-white font-medium border rounded-full" }
    ]
  },
  {
    title: "Robust Payment System",
    description: "개발 중인 안정적이고 보안성 높은 결제 시스템으로 다양한 결제 방식 지원",
    icon: <CreditCard className="w-16 h-16" />,
    tags: [
      { name: "Go", className: "text-white font-medium border rounded-full" },
      { name: "gRPC", className: "text-white font-medium border rounded-full" },
      { name: "PostgreSQL", className: "text-white font-medium border rounded-full" }
    ]
  },
  {
    title: "모니터링 시스템",
    description: "서버 및 애플리케이션 성능을 실시간으로 모니터링하는 대시보드 시스템",
    icon: <LineChart className="w-16 h-16" />,
    tags: [
      { name: "Spring Boot", className: "text-white font-medium border rounded-full" },
      { name: "React", className: "text-white font-medium border rounded-full" },
      { name: "Kafka", className: "text-white font-medium border rounded-full" },
      { name: "Logback", className: "text-white font-medium border rounded-full" },
      { name: "Elasticsearch", className: "text-white font-medium border rounded-full" },
      { name: "Logstash", className: "text-white font-medium border rounded-full" },
      { name: "Kibana", className: "text-white font-medium border rounded-full" },
    ]
  },
  {
    title: "Real-time Chat Platform",
    description: "웹소켓 기술을 활용한 실시간 채팅 플랫폼으로 즉각적인 메시지 전송 지원",
    icon: <MessageSquare className="w-16 h-16" />,
    tags: [
      { name: "Socket.io", className: "text-white font-medium border rounded-full" },
      { name: "Express", className: "text-white font-medium border rounded-full" },
      { name: "Vue.js", className: "text-white font-medium border rounded-full" }
    ]
  },
  {
    title: "Customer Management System v2",
    description: "고객 정보와 상호작용을 효율적으로 관리하는 CRM 솔루션의 개선 버전",
    icon: <LayoutGrid className="w-16 h-16" />,
    tags: [
      { name: "Angular", className: "text-white font-medium border rounded-full" },
      { name: "Spring Boot", className: "text-white font-medium border rounded-full" },
      { name: "Redis", className: "text-white font-medium border rounded-full" }
    ]
  },
  {
    title: "Second-hand Auction Platform v2",
    description: "중고 경매 플랫폼의 개선된 버전으로, 실시간 입찰과 결제 기능 강화",
    icon: <Database className="w-16 h-16" />,
    tags: [
      { name: "React", className: "text-white font-medium border rounded-full" },
      { name: "Node.js", className: "text-white font-medium border rounded-full" },
      { name: "MongoDB", className: "text-white font-medium border rounded-full" }
    ]
  },
  {
    title: "Second-hand Auction Platform v1",
    description: "중고 물품 경매를 위한 웹 플랫폼의 첫 번째 버전",
    icon: <Database className="w-16 h-16" />,
    tags: [
      { name: "PHP", className: "text-white font-medium border rounded-full" },
      { name: "MySQL", className: "text-white font-medium border rounded-full" },
      { name: "jQuery", className: "text-white font-medium border rounded-full" }
    ]
  },
  {
    title: "Customer Management System v1",
    description: "기본적인 고객 정보 관리 기능을 제공하는 CRM 시스템의 첫 버전",
    icon: <LayoutGrid className="w-16 h-16" />,
    tags: [
      { name: "jQuery", className: "text-white font-medium border rounded-full" },
      { name: "Express", className: "text-white font-medium border rounded-full" },
      { name: "MySQL", className: "text-white font-medium border rounded-full" }
    ]
  },
  
  // Undergraduate Projects
  {
    title: "CT Image Reconstruction",
    description: "컴퓨터 단층촬영(CT) 이미지를 복원하고 분석하는 알고리즘 개발 프로젝트",
    icon: <Image className="w-16 h-16" />,
    tags: [
      { name: "Python", className: "text-white font-medium border rounded-full" },
      { name: "TensorFlow", className: "text-white font-medium border rounded-full" },
      { name: "OpenCV", className: "text-white font-medium border rounded-full" }
    ]
  }
];