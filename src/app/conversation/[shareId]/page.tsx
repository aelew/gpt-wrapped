import { notFound } from 'next/navigation';

interface ConversationPageProps {
  params: {
    shareId: string;
  };
}

const SCRIPT_TAG_PREFIX =
  '<script id="__NEXT_DATA__" type="application/json" crossorigin="anonymous">';

const SCRIPT_TAG_SUFFIX = '</script>';

export default async function ConversationPage({
  params
}: ConversationPageProps) {
  const shareId = decodeURIComponent(params.shareId);
  const response = await fetch(`https://chat.openai.com/share/${shareId}`);
  if (!response.ok) {
    notFound();
  }

  const text = await response.text();
  const data = JSON.parse(
    text.split(SCRIPT_TAG_PREFIX)[1].split(SCRIPT_TAG_SUFFIX)[0]
  );

  return (
    <section className="flex flex-col">
      <p>Conversation page for shareId: {shareId}</p>
      <pre className="max-h-[75vh] max-w-[90vw] break-all">
        {JSON.stringify(data.props.pageProps.serverResponse, null, 2)}
      </pre>
    </section>
  );
}
