import { Box, Center, createStyles, Group, MantineTheme } from '@mantine/core';
import { lowerCase, upperFirst } from 'lodash';
import { ReactNode } from 'react';
import { ArrowDown, ArrowsVertical } from 'tabler-icons-react';
import { DataTableColumn, DataTableSortStatus } from './DataTable.props';
import useMediaQueryStringOrFn from './useMediaQueryStringOrFn';

const useStyles = createStyles((theme) => ({
  sortableColumnHeader: {
    cursor: 'pointer',
    transition: 'background .15s ease',
    '&:hover': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  columnHeaderText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    userSelect: 'none',
  },
  sortableColumnHeaderText: {
    minWidth: 0,
    flexGrow: 1,
  },
  sortableColumnHeaderIcon: {
    transition: 'transform .15s ease',
  },
  sortableColumnHeaderIconRotated: {
    transform: 'rotate3d(0, 0, 1, 180deg)',
  },
  sortableColumnHeaderNeutralIcon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    transition: 'color .15s ease',
    'th:hover &': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    },
  },
}));

type DataTableHeaderCell<T> = {
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: ReactNode | undefined;
  sortStatus: DataTableSortStatus | undefined;
  onSortStatusChange: ((sortStatus: DataTableSortStatus) => void) | undefined;
} & Pick<DataTableColumn<T>, 'accessor' | 'sortable' | 'textAlignment' | 'width'>;

export default function DataTableHeaderCell<T>({
  accessor,
  visibleMediaQuery,
  title,
  sortable,
  textAlignment,
  width,
  sortStatus,
  onSortStatusChange,
}: DataTableHeaderCell<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQueryStringOrFn(visibleMediaQuery)) return null;
  const text = title ?? upperFirst(lowerCase(accessor));
  return (
    <Box
      component="th"
      className={cx({ [classes.sortableColumnHeader]: sortable })}
      sx={{
        '&&': { textAlign: textAlignment },
        width,
        minWidth: width,
        maxWidth: width,
      }}
      role={sortable ? 'button' : undefined}
      onClick={
        sortable && onSortStatusChange
          ? () => {
              onSortStatusChange({
                columnAccessor: accessor,
                direction: sortStatus?.direction === 'asc' ? 'desc' : 'asc',
              });
            }
          : undefined
      }
    >
      {sortable || sortStatus?.columnAccessor === accessor ? (
        <Group position="apart" noWrap spacing="xs">
          <Box className={cx(classes.columnHeaderText, classes.sortableColumnHeaderText)}>{text}</Box>
          <Center>
            {sortStatus?.columnAccessor === accessor ? (
              <ArrowDown
                className={cx(classes.sortableColumnHeaderIcon, {
                  [classes.sortableColumnHeaderIconRotated]: sortStatus.direction === 'desc',
                })}
                size={14}
              />
            ) : (
              <ArrowsVertical className={classes.sortableColumnHeaderNeutralIcon} size={14} />
            )}
          </Center>
        </Group>
      ) : (
        <Box className={classes.columnHeaderText}>{text}</Box>
      )}
    </Box>
  );
}
