import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorsList = ['yellow', 'green', 'orange', 'red', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    listOfAppsAndPasswords: [],
    website: '',
    username: '',
    password: '',
    showPasswordsChecked: false,
  }

  getWebsite = event => {
    this.setState({website: event.target.value})
  }

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorsList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      listOfAppsAndPasswords: [...prevState.listOfAppsAndPasswords, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onClickShowPassword = event => {
    if (event.target.checked) {
      this.setState({showPasswordsChecked: true})
    } else {
      this.setState({showPasswordsChecked: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {listOfAppsAndPasswords} = this.state
    const newList = listOfAppsAndPasswords.filter(
      eachValue => eachValue.id !== id,
    )
    const caseOf = newList.length !== 0
    this.setState({listOfAppsAndPasswords: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      listOfAppsAndPasswords,
      showPasswordsChecked,
      searchInput,
    } = this.state

    let {isTrue} = this.state
    const newList = listOfAppsAndPasswords.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-manager-form-and-image-container">
          <img
            className="password-manager-small-image"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          />
          <form className="add-details-form" onSubmit={this.onClickAdd}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                onChange={this.getWebsite}
                placeholder="Enter Website"
                className="input-element"
                value={website}
              />
            </div>
            <div className="input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                onChange={this.getUserName}
                placeholder="Enter Username"
                value={username}
              />
            </div>
            <div className="input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.getPassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-large-image"
          />
        </div>
        <div className="passwords-list-container">
          <div className="header-section">
            <div className="passwords-count-container">
              <h1 className="your-password">Your Passwords</h1>
              <p className="number-of-passwords">{newList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-image"
                alt="search"
              />
              <input
                className="input-element"
                type="search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.onClickShowPassword}
            />
            <label htmlFor="check" className="show-passwords-label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-state-image"
                alt="no passwords"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="passwords-list">
              {newList.map(eachValue => (
                <li
                  className="list-item-container"
                  id={eachValue.id}
                  key={eachValue.id}
                >
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="password-details">
                    <p className="details-text">{eachValue.websiteName}</p>
                    <p className="details-text">{eachValue.userName}</p>
                    {!showPasswordsChecked && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {showPasswordsChecked && (
                      <p className="details-text">{eachValue.Password}</p>
                    )}
                  </div>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="input-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
