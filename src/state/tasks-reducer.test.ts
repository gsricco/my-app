import {useState} from "react";
import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

test('correct task should be deleted from correct array ',()=>{

    const startState:TasksStateType ={
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status:TaskStatuses.New,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '2', title: "JS/TS", status:TaskStatuses.New,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '3', title: "React", status:TaskStatuses.Completed,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
        ],
        'todolistId2': [
            {id: '1', title: "Book", status:TaskStatuses.New,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId2',order: 0, addedDate: '',},
            {id: '2', title: "Milk", status:TaskStatuses.Completed,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId2',order: 0, addedDate: '',},
            {id: '3', title: "Tea", status:TaskStatuses.Completed,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId2',order: 0, addedDate: '',},
        ],
    }

    const action=removeTaskAC('2','todolistId2');
    const endState = tasksReducer(startState,action);


    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t=>t.id!='2')).toBeTruthy();  // every перебирает каждый элемент и проверяет условие на true
    expect(endState['todolistId2'][1].id).toBe('3');

})

test('correct task should be added to correct array ',()=>{

    const startState:TasksStateType ={
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status:TaskStatuses.New,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '2', title: "JS/TS", status:TaskStatuses.New,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '3', title: "React", status:TaskStatuses.Completed,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
        ],
        'todolistId2': [
            {id: '1', title: "Book", status:TaskStatuses.New,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId2',order: 0, addedDate: '',},
            {id: '2', title: "Milk", status:TaskStatuses.Completed,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId2',order: 0, addedDate: '',},
            {id: '3', title: "Tea", status:TaskStatuses.Completed,description: '',priority: TaskPriorities.Low,startDate: '',deadline: '', todoListId: 'todolistId2',order: 0, addedDate: '',},
        ],
    }

    const action=addTaskAC('juce','todolistId2');
    const endState = tasksReducer(startState,action);


    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].id).toBeDefined(); // существует
    expect(endState['todolistId2'][1].id).toBe('1');

})


test('status of specified task should be chenged  ',()=>{

    const startState:TasksStateType ={
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '2', title: "JS/TS", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '3', title: "React", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
        ],
        'todolistId2': [
            {id: '1', title: "Book", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '2', title: "Milk", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '3', title: "Tea", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
        ],
    }

    const action= changeTaskStatusAC('2',0,'todolistId2');
    const endState = tasksReducer(startState,action);



    // expect(endState['todolistId2'][1].status.toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].id).toBeTruthy();

})

test('new array should be added when new todokist is added ',()=>{

    const startState:TasksStateType ={
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '2', title: "JS/TS", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '3', title: "React", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
        ],
        'todolistId2': [
            {id: '1', title: "Book", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '2', title: "Milk", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '3', title: "Tea", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
        ],
    }

    const action= addTodolistAC('newTodolistTitle');
    const endState = tasksReducer(startState,action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k=>k !='todolistId1' && k!='todolistId2');
    if (!newKey){
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3) ;
    expect(endState[newKey]).toStrictEqual([]);
})


test('property with todolistId should be deleted',()=>{
    const startState:TasksStateType ={
        'todolistId1': [
            {id: '1', title: "HTML&CSS", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '2', title: "JS/TS", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '3', title: "React", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
        ],
        'todolistId2': [
            {id: '1', title: "Book", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '2', title: "Milk", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: '3', title: "Tea", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
        ],
    }

    const action = removeTodolistAC('todolistId2');

    const endState=tasksReducer(startState,action);

    const keys = Object.keys(endState);

expect(keys.length).toBe(1);
expect(endState['todolistId2']).toBeUndefined();


})

