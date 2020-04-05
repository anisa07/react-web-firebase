import React, { Component } from "react";
import Header from "../components/Header";
import { auth, db } from "../services/firebase";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.user = auth().currentUser;
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref('chats').on('value', snapshot => {
        const chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort((a, b) => a.timestamp - b.timestamp );
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange = (event) => {
      this.setState({
        content: event.target.value
      });
  };

  handleSubmit = async(event) => {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    const content = this.state.content;

    if (content) {
      try {
        await db.ref('chats').push({
          content: content.replace(/\s+/g,' ').trim(),
          timestamp: Date.now(),
          uid: this.user.uid,
          email: this.user.email
        });

        this.setState({ content: '' });
        chatArea.scrollBy(0, chatArea.scrollHeight);
      } catch (error) {
        this.setState({ writeError: error.message });
      }
    }
  };

  handleDelete = async() => {
    try {
      await db.ref('chats').remove();
      this.setState({ content: '' });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };

  formatTime(timestamp) {
    const d = new Date(timestamp);
    return `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  }

  render() {
    const {loadingChats, content, error, chats } = this.state;

    return (
      <div>
        <Header />

        <div className="chat-area" ref={this.myRef}>
          {/* loading indicator */}
          {loadingChats && <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>}
          {/* chat area */}
          {chats.map(chat => {
            return <p key={chat.timestamp} className={"chat-bubble " + (this.user.uid === chat.uid ? "current-user" : "")}>
              {chat.content}
              <br />
              <span className="chat-time float-left">{chat.email}</span>
              <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
        </div>
        <form onSubmit={this.handleSubmit} className="mx-3">
          <textarea className="form-control" name="content" onChange={this.handleChange} value={content} />
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
        </form>
        <div className="py-2 mx-3">
          Login in as: <strong className="text-info">{this.user.email}</strong>
          <div>
            <button type="button" className="btn btn-danger px-4 mt-3" onClick={this.handleDelete}>Clear chat</button>
          </div>
        </div>
      </div>
    );
  }
}
