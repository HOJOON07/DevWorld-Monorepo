export * from 'platejs/react';
export { EditorKit, type MyEditor, useEditor } from './components/editor/editor-kit';
export * from './components/editor/settings-dialog';
export * from './components/ui/editor';
export * from './hooks/use-editable-editor';

// import {
//   Editor,
//   EditorContainer,
//   EditorKit,
//   Plate,
//   SettingsDialog,
//   useEditorSelector,
//   usePlateEditor,
// } from '@devworld/editor';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getDocsDetail } from '../app/api/get-docs-detail';
// import { useGetDocsDetail } from '../app/api/query-hooks/use-get-docs-detail';

// export default function Detail() {
//   const { id } = useParams();
//   const { data } = useGetDocsDetail({ id });
//   const isReadOnly = useEditorSelector((editor)=>editor.)

//   const editor = usePlateEditor({
//     plugins: EditorKit,
//     // value: async () => {
//     //   const data = await getDocsDetail({ id: id! });
//     //   return data.contents;
//     // },
//     autoSelect: 'end',
//   });

//   useEffect(() => {
//     if (data) {
//       console.log(data);
//       editor.tf.init({
//         value: data?.contents,
//         onReady: () => {
//           console.log('onReady');
//         },
//       });
//     }
//   }, [data, editor]);

//   return (
//     <Plate editor={editor}>
//       <EditorContainer>
//         <Editor variant='none' className='min-w-0 overflow-hidden px-20' />
//       </EditorContainer>
//       <SettingsDialog />
//     </Plate>
//   );
// }
