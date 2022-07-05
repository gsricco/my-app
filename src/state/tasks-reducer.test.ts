import {useState} from "react";
import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('correct task should be deleted from correct array ',()=>{

    const startState:TasksStateType ={
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS/TS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: true},
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
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS/TS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: true},
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
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS/TS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: true},
        ],
    }

    const action= changeTaskStatusAC('2',false,'todolistId2');
    const endState = tasksReducer(startState,action);



    expect(endState['todolistId2'][1].isDone).toBeFalsy() ;
    expect(endState['todolistId1'][1].id).toBeTruthy();

})

test('new array should be added when new todokist is added ',()=>{

    const startState:TasksStateType ={
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS/TS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: true},
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
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS/TS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Tea", isDone: true},
        ],
    };

    const action = removeTodolistAC('todolistId2');

    const endState=tasksReducer(startState,action);

    const keys = Object.keys(endState);

expect(keys.length).toBe(1);
expect(endState['todolistId2']).toBeUndefined();


})

