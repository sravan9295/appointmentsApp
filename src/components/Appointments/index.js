// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="app-content">
          <div className="add-appointment">
            <form onSubmit={this.onClickAddButton}>
              <h1>Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                onChange={this.onChangeTitleInput}
                id="title"
                type="text"
                placeholder="Title"
                value={titleInput}
              />
              <br />
              <label htmlFor="date">Date</label>
              <br />
              <input
                onChange={this.onChangeDateInput}
                id="date"
                type="date"
                value={dateInput}
              />
              <br />

              <button type="submit">Add</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="horizontalLine" />
          <div className="appointments-list-header">
            <h1>Appointments</h1>
            <button
              onClick={this.onClickFilter}
              type="button"
              className={`filter-style ${filterClassName}`}
            >
              Starred
            </button>
          </div>
          <ul>
            {filteredAppointmentsList.map(each => (
              <AppointmentItem
                key={each.id}
                details={each}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
