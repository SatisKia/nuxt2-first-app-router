import { getterTree, mutationTree, actionTree, getAccessorType } from 'typed-vuex'
import { Todo } from '@/types/todo'

export const state = () => ({
  todoList: [] as Todo[],
  dateType: 1,
  dispYear: true
})

export const getters = getterTree(state, {
  todoList (state) {
    return state.todoList
  },
  dateType (state) {
    return state.dateType
  },
  dispYear (state) {
    return state.dispYear
  }
})

export const mutations = mutationTree(state, {
  initialize (state) {
    state.todoList = [] as Todo[]
  },
  push (state, payload: { todo: Todo }) {
    state.todoList.push(payload.todo)
  },
  add (state, payload: { todo: Todo }) {
    state.todoList = [...state.todoList, payload.todo]
  },
  remove (state, payload: { id: string }) {
    state.todoList = state.todoList.filter(todo => todo.id !== payload.id)
  },
  done (state, payload: { id: string }) {
    const todo = state.todoList.find(todo => todo.id === payload.id)
    if (todo) {
      todo.done = !todo.done
    }
  },
  setDateType (state, payload: { dateType: number }) {
    state.dateType = payload.dateType
  },
  setDispYear (state, payload: { dispYear: boolean }) {
    state.dispYear = payload.dispYear
  }
})

export const actions = actionTree({ state, getters, mutations }, {
  actionInitialize (context) {
    context.commit('initialize')
  },
  actionPush (context, payload: { todo: Todo }) {
    context.commit('push', payload)
  },
  actionAdd (context, payload: { todo: Todo }) {
    context.commit('add', payload)
  },
  actionRemove (context, payload: { id: string }) {
    context.commit('remove', payload)
  },
  actionDone (context, payload: { id: string }) {
    context.commit('done', payload)
  },
  actionSetDateType (context, payload: { dateType: number }) {
    context.commit('setDateType', payload)
  },
  actionSetDispYear (context, payload: { dispYear: boolean }) {
    context.commit('setDispYear', payload)
  }
})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions
})
