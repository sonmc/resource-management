import React, { useState } from 'react';
import Board, { moveCard } from '@asseinfo/react-kanban';
import CardTaskBox from './taskCard';
import RenderCardTitle from './HeaderComponets';
import '@asseinfo/react-kanban/dist/styles.css';

import FeatherIcon from 'feather-icons-react';
const convertTasksToCards = (x) => {
    const { tasks, ...other } = x;
    return { ...other, cards: tasks };
};
const setIndexAfterDrag = (arr) => {
    arr.forEach((c, i1) => {
        c.index = i1;
        c.cards.forEach((t, i2) => {
            t.index = i2;
        });
    });
    return arr;
};
const convertDataSetIndex = (column) => {
    let tasks = column.cards.map((x) => ({ taskId: x.id, index: x.index }));

    return { columnId: column.id, tasks: tasks };
};
const UncontrolledBoard = (props) => {
    const { board, updateColumnName, createColumn, createTask, updateIndexTask, deleteKanbanColumn, deleteTask, updateIndexColumn } = props;
    const [data, setData] = useState(
        board.map((x) => {
            return convertTasksToCards(x);
        })
    );

    return (
        <Board
            allowRemoveCard
            allowRenameColumn
            initialBoard={{ columns: data }}
            allowAddColumn={{ on: 'right' }}
            allowAddCard={{ on: 'top' }}
            onNewCardConfirm={({ title, description }) => {
                let model = { id: 0, name: title, description };

                return model;
            }}
            onCardDragEnd={(board, column, from, to) => {
                let columns = setIndexAfterDrag(board.columns);
                setData(columns);
                let fromColumn = columns.find((x) => x.id === from.fromColumnId);
                let toColumn = columns.find((x) => x.id === to.toColumnId);
                let dataSetIndex = [convertDataSetIndex(fromColumn), convertDataSetIndex(toColumn)];
                if (from.fromColumnId === to.toColumnId) dataSetIndex = dataSetIndex.splice(0, 1);
                updateIndexTask(dataSetIndex);
            }}
            onColumnDragEnd={(board, column, from, to) => {
                let columns = setIndexAfterDrag(board.columns);
                setData(columns);
                let model = columns.map((x) => ({ columnId: x.id, index: x.index }));
                updateIndexColumn(model);
            }}
            onCardNew={(e, r) => {
                let index = r.cards.length - 1;
                let task = r.cards[index];
                createTask(task)
                    .then((res) => {
                        r.cards[index] = res;
                        let columns = setIndexAfterDrag(e.columns);
                        setData(columns);
                        let column = columns.find((x) => x.id === r.id);
                        let dataSetIndex = [convertDataSetIndex(column)];
                        updateIndexTask(dataSetIndex);
                    })
                    .catch(() => {});
            }}
            onColumnRename={console.log}
            onColumnNew={console.log}
            onColumnRemove={console.log}
            onCardRemove={console.log}
            renderColumnHeader={(kanban_column, { removeColumn }) => {
                return (
                    <RenderCardTitle
                        kanban_column={kanban_column}
                        updateColumnName={updateColumnName}
                        removeColumn={() => {
                            deleteKanbanColumn(kanban_column.id)
                                .then(() => {
                                    removeColumn();
                                })
                                .catch(() => {
                                    removeColumn();
                                });
                        }}
                    />
                );
            }}
            renderCard={(data, { removeCard }) => {
                return (
                    <CardTaskBox
                        data={data}
                        removeCard={() => {
                            deleteTask(data.id)
                                .then(() => {
                                    removeCard();
                                })
                                .catch(() => {
                                    removeCard();
                                });
                        }}
                    ></CardTaskBox>
                );
            }}
            renderColumnAdder={({ addColumn }) => <ColumnAdder addColumn={addColumn} createColumn={createColumn} />}
        />
    );
};
const ColumnAdder = ({ addColumn, createColumn }) => {
    return (
        <div
            onClick={() => {
                createColumn({ id: 0, name: 'New Column', cards: [] })
                    .then((res) => {
                        addColumn(convertTasksToCards(res));
                    })
                    .catch(() => {
                        addColumn({ id: 0, name: 'New Column', cards: [] });
                    });
            }}
            className="react-kanban-column d-flex "
            style={{ cursor: 'pointer' }}
        >
            <FeatherIcon icon="plus" className="icon-sm" />
            Add column
        </div>
    );
};
export default UncontrolledBoard;
