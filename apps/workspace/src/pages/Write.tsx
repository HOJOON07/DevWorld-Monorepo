import WorkspaceEditor from '../components/editor/Editor';

const Placeholder = [
  {
    children: [{ text: 'Title' }],
    type: 'h1',
  },
  {
    children: [{ text: '' }],
    type: 'hr',
  },
];

export default function Write() {
  return <WorkspaceEditor value={Placeholder} />;
}
