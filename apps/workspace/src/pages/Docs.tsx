import { DocsTableHeader } from '../components/docs/docs-table-header';
import { type DocsItemProps, DocsTableItem } from '../components/docs/docs-table-item';

// 임시 더미 데이터
const MOCK_DOCS: DocsItemProps[] = [
  {
    id: '1',
    title: 'React 컴포넌트 설계 가이드',
    createdAt: '2024.01.15',
    modifiedAt: '2024.01.20',
  },
  {
    id: '2',
    title: 'Next.js 프로젝트 구조 및 최적화',
    createdAt: '2024.01.10',
    modifiedAt: '2024.01.18',
  },
  {
    id: '3',
    title: 'TypeScript 타입 시스템 심화',
    createdAt: '2024.01.05',
    modifiedAt: '2024.01.16',
  },
  {
    id: '1',
    title: 'React 컴포넌트 설계 가이드',
    createdAt: '2024.01.15',
    modifiedAt: '2024.01.20',
  },
  {
    id: '2',
    title: 'Next.js 프로젝트 구조 및 최적화',
    createdAt: '2024.01.10',
    modifiedAt: '2024.01.18',
  },
  {
    id: '3',
    title: 'TypeScript 타입 시스템 심화',
    createdAt: '2024.01.05',
    modifiedAt: '2024.01.16',
  },
  {
    id: '1',
    title: 'React 컴포넌트 설계 가이드',
    createdAt: '2024.01.15',
    modifiedAt: '2024.01.20',
  },
  {
    id: '2',
    title: 'Next.js 프로젝트 구조 및 최적화',
    createdAt: '2024.01.10',
    modifiedAt: '2024.01.18',
  },
  {
    id: '3',
    title: 'TypeScript 타입 시스템 심화',
    createdAt: '2024.01.05',
    modifiedAt: '2024.01.16',
  },
  {
    id: '1',
    title: 'React 컴포넌트 설계 가이드',
    createdAt: '2024.01.15',
    modifiedAt: '2024.01.20',
  },
  {
    id: '2',
    title: 'Next.js 프로젝트 구조 및 최적화',
    createdAt: '2024.01.10',
    modifiedAt: '2024.01.18',
  },
  {
    id: '3',
    title: 'TypeScript 타입 시스템 심화',
    createdAt: '2024.01.05',
    modifiedAt: '2024.01.16',
  },
  {
    id: '1',
    title: 'React 컴포넌트 설계 가이드',
    createdAt: '2024.01.15',
    modifiedAt: '2024.01.20',
  },
  {
    id: '2',
    title: 'Next.js 프로젝트 구조 및 최적화',
    createdAt: '2024.01.10',
    modifiedAt: '2024.01.18',
  },
  {
    id: '3',
    title: 'TypeScript 타입 시스템 심화',
    createdAt: '2024.01.05',
    modifiedAt: '2024.01.16',
  },
  {
    id: '1',
    title: 'React 컴포넌트 설계 가이드',
    createdAt: '2024.01.15',
    modifiedAt: '2024.01.20',
  },
  {
    id: '2',
    title: 'Next.js 프로젝트 구조 및 최적화',
    createdAt: '2024.01.10',
    modifiedAt: '2024.01.18',
  },
  {
    id: '3',
    title: 'TypeScript 타입 시스템 심화',
    createdAt: '2024.01.05',
    modifiedAt: '2024.01.16',
  },
];

export default function Docs() {
  const handleItemClick = (id: string) => {
    console.log('Navigate to doc:', id);
  };

  return (
    <div className='flex h-full flex-col'>
      <DocsTableHeader />

      <div className='flex-1 overflow-y-auto'>
        {MOCK_DOCS.map((doc) => (
          <DocsTableItem key={doc.id} {...doc} onClick={handleItemClick} />
        ))}
      </div>
    </div>
  );
}
