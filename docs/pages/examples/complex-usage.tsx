import { Box, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ComplexUsageExample from '~/examples/ComplexUsageExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/complex-usage';

export const getStaticProps: GetStaticProps<{
  code: { 'ComplexUsageExample.tsx': string; 'data.ts': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'ComplexUsageExample.tsx': readCodeExample('examples/ComplexUsageExample.tsx') as Promise<string>,
      'data.ts': readCodeExample('data.ts') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Here is a complex usage scenario featuring custom column definitions, asynchronous data loading with{' '}
        <ExternalLink to="https://tanstack.com/query/v4/docs/adapters/react-query">React Query</ExternalLink>,
        pagination, sorting and row context-menu.
      </PageText>
      <Box sx={{ height: 320 }}>
        <ComplexUsageExample />
      </Box>
      <CodeBlockTabs
        items={[
          { title: 'ComplexUsageExample.tsx', language: 'typescript', content: code['ComplexUsageExample.tsx'] },
          { title: 'data.ts', language: 'typescript', content: code['data.ts'] },
        ]}
      />
      <PageNavigation of={PATH} />
    </Container>
  );
}
