import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import LottieSuccess from '../LottieCircle/LottieSuccess';
import axios from 'axios';
import './DraggableCardList.css';

const DraggableCardList = () => {
  const [columns, setColumns] = useState({
    'in process': { id: 'in process', title: 'In Process', cards: [] },
    'done': { id: 'done', title: 'Done', cards: [] }
  });
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [showLottieSuccess, setShowLottieSuccess] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      const fetchedCards = response.data;
      const newColumns = {
        'new task': { id: 'new task', title: 'New Task', cards: [] },
        'in process': { id: 'in process', title: 'In Process', cards: [] },
        'done': { id: 'done', title: 'Done', cards: [] }
      };
      fetchedCards.forEach(card => {
        newColumns[card.status].cards.push(card);
      });
      setColumns(newColumns);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    const newCard = { name, priority, description, status: 'new task', dateCreated: new Date().toISOString() };
    try {
      await axios.post('http://localhost:5000/api/tasks', newCard);
      fetchCards();
      setName('');
      setPriority('');
      setDescription('');
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleDeleteAllCards = async () => {
    try {
      await axios.delete('http://localhost:5000/api/tasks');
      fetchCards();
    } catch (error) {
      console.error('Error deleting all cards:', error);
    }
  };

  const handleOnDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    const newStartCards = Array.from(startColumn.cards);
    const [movedCard] = newStartCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      newStartCards.splice(destination.index, 0, movedCard);
      const newColumn = {
        ...startColumn,
        cards: newStartCards,
      };
      setColumns({
        ...columns,
        [source.droppableId]: newColumn,
      });
    } else {
      const newEndCards = Array.from(endColumn.cards);
      newEndCards.splice(destination.index, 0, movedCard);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...startColumn,
          cards: newStartCards,
        },
        [destination.droppableId]: {
          ...endColumn,
          cards: newEndCards,
        },
      });

      try {
        await axios.put(`http://localhost:5000/api/tasks/${movedCard._id}`, { status: destination.droppableId });
        movedCard.status = destination.droppableId;
        if (destination.droppableId === 'done') {
          setShowLottieSuccess(true);
          setTimeout(() => setShowLottieSuccess(false), 5200);
        }
      } catch (error) {
        console.error('Error updating card status:', error);
      }
    }
  };

  const handleChangePriority = async (id, newPriority) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { priority: newPriority });
      fetchCards();
    } catch (error) {
      console.error('Error updating card priority:', error);
    }
  };

  const getClassNameForPriority = (card) => {
    if (card.status === 'done') {
      return 'done';
    } else if (card.priority === 'High') {
      return 'blink-red';
    } else if (card.priority === 'Low') {
      return 'blink-blue';
    } else if (card.priority === 'Medium') {
      return 'blink-orange';
    }
    return '';
  };

  return (
    <div className="cards-container">
      <form onSubmit={handleAddCard} className="card-form">
        <div className="form-group">
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Add New Task</button>
      </form>

      <button onClick={handleDeleteAllCards} className="btn-delete-all">Delete All Cards</button>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="table-container">
          <div className="table-header">
            {Object.values(columns).map((column) => (
              <div key={column.id} className="column-header">{column.title}</div>
            ))}
          </div>
          <div className="table-body">
            {Object.values(columns).map((column) => (
              <div key={column.id} className="table-column">
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="card-list"
                    >
                      {column.cards.map((card, index) => (
                        <Draggable key={card._id} draggableId={card._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`card ${getClassNameForPriority(card)}`}
                            >
                              <h3>{card.name}</h3>
                              <div className="card-priority">
                                <label htmlFor={`priority-${card._id}`}>Priority</label>
                                <select
                                  id={`priority-${card._id}`}
                                  value={card.priority}
                                  onChange={(e) => handleChangePriority(card._id, e.target.value)}
                                >
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                </select>
                              </div>
                              <p>Date: {new Date(card.dateCreated).toLocaleDateString()}</p>
                              <p>Description: {card.description}</p>
                              <button onClick={() => handleDeleteCard(card._id)} className="btn-delete">Delete</button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>

      {showLottieSuccess && (
        <div className="lottie-success">
          <LottieSuccess />
        </div>
      )}
    </div>
  );
};

export default DraggableCardList;
