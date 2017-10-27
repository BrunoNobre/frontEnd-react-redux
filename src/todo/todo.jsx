import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = { description: '', list: [] };
        
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleClear = this.handleClear.bind(this);
        // this.refresh();
    }

    refresh(description = '') {
        const search = description ? `&description_regex=/${description}/` : '';
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({ ...this.props, description, list: resp.data }))
            .catch(err => console.error(err));
    }

    handleClear() {
        this.refresh();
    }

    handleSearch() {
        this.refresh(this.state.description);
    }

    handleAdd() {
        this.setState({ ...this.state, list: [{description: 'teste', _id: '123dsda211', createdAt: new Date(), done: true}]})
        // const description = this.state.description;
        // axios.post(URL, {description})
        //     .then(resp => this.refresh())
        //     .catch(err => console.error(err));
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value });
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
            .catch(err => console.error(err));
    }

    handleMarkAsDone(todo) {
        const elem = { ...todo, done: true};
        this.setState(elem)
        this.setState({ ...this.state, list: [elem]})
        // axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
        //     .then(resp => this.refresh(this.state.description))
        //     .catch(err => console.error(err));
    }

    handleMarkAsPending(todo) {
        const elem = { ...todo, done: false};
        this.setState(elem)
        this.setState({ ...this.state, list: [elem]})
        
        // axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
        //     .then(resp => this.refresh(this.state.description))
        //     .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}/>
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}/>
            </div>
        )
    }
}