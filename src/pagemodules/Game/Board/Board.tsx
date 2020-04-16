import _ from 'lodash'
import classNames from 'classnames'
import * as React from 'react'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { RefMap2D } from 'hooks/useRefMap2D'

export interface BoardProps {
  classes?: Partial<ReturnType<typeof useStyles>>
  className?: string
  cellRefs: RefMap2D<HTMLTableCellElement>
}

export const Board = React.forwardRef<HTMLTableElement, BoardProps>(
  (props, ref) => {
    const { className, cellRefs } = props

    const boardSize = useSelector((state) => state.board.boardSize)
    const classes = useStyles({ boardSize })

    return (
      <table ref={ref} className={classNames(className, classes.root)}>
        <tbody>
          {_.times(boardSize, (row) => (
            <tr key={'row-' + row}>
              {_.times(boardSize, (col) => (
                <td
                  key={'col-' + col}
                  className={classes.cell}
                  data-col={col}
                  data-row={row}
                  ref={cellRefs(col, row)}>
                  <span className={classes.cellInner}></span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
)

Board.defaultProps = {}

export default Board
