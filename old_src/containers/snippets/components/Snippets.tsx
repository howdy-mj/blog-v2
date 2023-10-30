import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@constants/routes';
import styled from 'styled-components';
import { Content } from '@utils/getFiles';

type SnippetsProps = {
  snippets: Content[];
};

const Snippets = ({ snippets }: SnippetsProps) => {
  return (
    <TableWrapper>
      <Table>
        <colgroup>
          <col />
          <col width="30%" />
          <col width="15%" />
        </colgroup>
        <Thead>
          <tr>
            <th>Title</th>
            <th>Tag</th>
            <th>Last Updated</th>
          </tr>
        </Thead>
        <Tbody>
          {snippets.map((snippet) => {
            const { title, tags, summary, draft, date, lastMod } = snippet.frontMatter;
            return (
              <tr key={snippet.slug}>
                <td>
                  <Link href={`${ROUTES.SNIPPETS}/${snippet.slug}`} passHref>
                    <TitleText>
                      {draft && <DraftText>Draft</DraftText>}
                      {title}
                      {summary && <SummaryText>{summary}</SummaryText>}
                    </TitleText>
                  </Link>
                </td>
                <td>{tags && tags.length > 1 ? tags.join(', ') : tags}</td>
                <td>{lastMod ? lastMod : date}</td>
              </tr>
            );
          })}
        </Tbody>
      </Table>
    </TableWrapper>
  );
};

export default Snippets;

const TableWrapper = styled.div`
  ${(p) => p.theme.media.mobile} {
    overflow-x: scroll;
  }
`;

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;

  ${(p) => p.theme.media.mobile} {
    colgroup {
      > col {
        &:first-child {
          width: 20rem;
        }
        &:nth-child(2) {
          width: 20rem;
        }
        &:nth-child(3) {
          width: 12rem;
        }
      }
    }
  }
`;

const Thead = styled.thead`
  text-align: left;
  font-size: 1.8rem;
  border-bottom: 1px solid var(--border1);

  th {
    padding: 1rem 0.5rem;
  }
`;

const Tbody = styled.tbody`
  tr {
    &:hover {
      background-color: var(--hover1);
    }
  }

  td {
    word-wrap: break-word;
    padding: 1.5rem 0.5rem;
  }
`;

const DraftText = styled.span`
  font-size: 1.4rem;
  background-color: var(--bg-secondary);
  color: var(--text-basic);
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
`;

const TitleText = styled.div`
  position: relative;
  display: inline-block;
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;

  &:hover > span {
    visibility: visible;
  }
`;

const SummaryText = styled.span`
  visibility: hidden;
  position: absolute;
  top: 2.5rem;
  left: 0;
  z-index: 1;
  width: max-content;
  max-width: 30rem;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  font-weight: normal;
`;
