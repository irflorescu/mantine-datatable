import { Container } from '@mantine/core';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import { AUTHOR_LINK, REPO_LINK } from '~/config';

const PATH = 'contribute-and-support';

export default function Page() {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        I’ve dedicated a sizeable amount of my own free time to build this project because:
        <ul>
          <li>
            I think <ExternalLink to="https://mantine.dev/">Mantine</ExternalLink> is currently the best React UI
            Framework; however people were{' '}
            <ExternalLink to="https://github.com/mantinedev/mantine/discussions/195">constantly</ExternalLink>{' '}
            <ExternalLink to="https://github.com/mantinedev/mantine/discussions/1057">asking</ExternalLink> in the
            community for a component with Data Table / Data Grid functionality;
          </li>
          <li>
            I’m a keen advocate of open-source and{' '}
            <ExternalLink to="https://medium.com/@icflorescu/open-source-capitalism-and-democracy-c71f025b6eba">
              I believe in its power to make our world a better place.
            </ExternalLink>
          </li>
        </ul>
      </PageText>
      <PageText>
        If you have an idea about a new feature and are willing to put your effort into it, please don’t hesitate to{' '}
        <ExternalLink to={REPO_LINK}>make a PR</ExternalLink>. Contributions are more than welcome.
      </PageText>
      <PageText>
        If you find this project useful, it would help a lot to{' '}
        <ExternalLink to="http://twitter.com/share?text=Build%20data-rich%20React%20applications%20with%20Mantine%20DataTable&url=https%3A%2F%2Fgithub.com%2Ficflorescu%2Fmantine-datatable&hashtags=mantine%2Cdatatable%2Cdatagrid%2Creact&via=icflorescu">
          spread the word
        </ExternalLink>
        , star the <ExternalLink to={REPO_LINK}>repository</ExternalLink> and{' '}
        <ExternalLink to="https://www.linkedin.com/in/icflorescu">endorese me on LinkedIn</ExternalLink>.
      </PageText>
      <PageText>
        Thank you for your support,
        <br />
        <ExternalLink to={AUTHOR_LINK}>Ionut-Cristian Florescu</ExternalLink>
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
