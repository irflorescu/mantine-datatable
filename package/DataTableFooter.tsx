import { Box, createStyles, MantineNumberSize, Pagination, Text } from '@mantine/core';
import { ForwardedRef, forwardRef } from 'react';
import { DataTablePaginationProps } from './DataTable.props';

const useStyles = createStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.xs,
    [theme.fn.largerThan('xs')]: { flexDirection: 'row' },
  },
  pagination: {
    opacity: 1,
    transition: 'opacity .15s ease',
  },
  paginationFetching: {
    opacity: 0,
  },
}));

type DataTableFooterProps = DataTablePaginationProps & {
  fetching: boolean | undefined;
  recordsLength: number | undefined;
  horizontalSpacing: MantineNumberSize | undefined;
};

export default forwardRef(function DataTableFooter(
  {
    fetching,
    page,
    onPageChange,
    paginationSize,
    totalRecords,
    recordsPerPage,
    recordsLength,
    horizontalSpacing,
  }: DataTableFooterProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  let paginationText: string;
  if (fetching) {
    paginationText = '...';
  } else {
    const from = (page! - 1) * recordsPerPage! + 1;
    const to = from + recordsLength! - 1;
    paginationText = `${from} - ${to}`;
    if (totalRecords) paginationText += ` / ${totalRecords}`;
  }

  const { classes, cx } = useStyles();

  return (
    <Box ref={ref} px={horizontalSpacing ?? 'xs'} py="xs" className={classes.root}>
      <Text size={paginationSize}>{paginationText}</Text>
      <Pagination
        className={cx(classes.pagination, { [classes.paginationFetching]: fetching || !recordsLength })}
        page={page}
        onChange={onPageChange}
        size={paginationSize}
        total={Math.ceil(totalRecords! / recordsPerPage!)}
      />
    </Box>
  );
}) as (props: DataTableFooterProps & { ref: ForwardedRef<HTMLDivElement> }) => JSX.Element;
