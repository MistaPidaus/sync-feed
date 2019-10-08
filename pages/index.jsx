import App from "next/app";
import Router from "next/router";
import "../styles/index.css";
import "../static/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetch from "isomorphic-unfetch";
import { BASE_API } from "../utils/config";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import Loading from "../components/Loading";

class Index extends React.Component {
  static async getInitialProps({ query: { start = 1 } }) {
    const res = await fetch(
      `${BASE_API}/interview/feed?start=${start}&limit=10`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJpdiI6ImtQSUhpT0JwbFNxdlJoK3Z2V2pFWGc9PSIsInZhbHVlIjoiemJcL0pCZ21YNUY4MzU0ZTJlZWJuTEhhanF1VkVqNURLc3BKa1d6UzVRODRCeWcwbUpqVjFrN1Q2V3RWVkpPMTR2VzdzZmpQYjRIdTNSZFwvS2xwOFd2dz09IiwibWFjIjoiY2M3YWU0OWU2Zjc2MjNkYTcwNDI2ZjRmYjkxNGNlY2VjMTRlYzNjYzE1MTYxMjhhYTdkZWYzYTk3MTdlOTA5YyJ9"
        }
      }
    );
    const data = await res.json();

    return {
      result: data
    };
  }

  state = {
    result: null,
    hasMore: true,
    isActive: false,
    total: null,
    start: 1
  };

  componentDidMount() {
    this.setState({
      result: this.props.result.data,
      total: 1000
    });
  }

  loadMore() {
    if (this.state.result.length === this.state.total) {
      this.setState({ hasMore: false });
    } else {
      axios
        .get(
          `${BASE_API}/interview/feed?start=${this.state.start + 1}&limit=10`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJpdiI6ImtQSUhpT0JwbFNxdlJoK3Z2V2pFWGc9PSIsInZhbHVlIjoiemJcL0pCZ21YNUY4MzU0ZTJlZWJuTEhhanF1VkVqNURLc3BKa1d6UzVRODRCeWcwbUpqVjFrN1Q2V3RWVkpPMTR2VzdzZmpQYjRIdTNSZFwvS2xwOFd2dz09IiwibWFjIjoiY2M3YWU0OWU2Zjc2MjNkYTcwNDI2ZjRmYjkxNGNlY2VjMTRlYzNjYzE1MTYxMjhhYTdkZWYzYTk3MTdlOTA5YyJ9"
            }
          }
        )
        .then(response => {
          this.setState({
            result: this.state.result.concat(response.data.data),
            start: this.state.start + 1
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  onPageChanged = data => {
    Router.push(`/?start=${data.currentPage}`).then(() =>
      window.scrollTo(0, 0)
    );
  };

  render() {
    const { isActive, result, start } = this.state;
    return (
      <div className="font-sans bg-gray-200 flex flex-col min-h-screen w-full">
        <div>
          <div className="bg-sync-blue-600 shadow">
            <div className="container mx-auto px-4">
              <div className="flex items-center md:justify-between py-4">
                <div
                  className="w-1/4 md:hidden"
                  onClick={() => this.setState({ isActive: !isActive })}
                >
                  <svg
                    className="fill-current text-white h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z" />
                  </svg>
                </div>
                <div className="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
                  <FontAwesomeIcon
                    icon="rocket"
                    className="m-auto text-2xl mr-2"
                  />
                  <span className="font-semibold text-xl tracking-tight">
                    Sync
                  </span>
                </div>
                <div className="w-1/4 md:w-auto md:flex text-right">
                  <div>
                    <img
                      className="inline-block h-8 w-8 rounded-full"
                      src="https://avatars0.githubusercontent.com/u/21690115?s=460&v=4"
                      alt=""
                    />
                  </div>
                  <div className="hidden md:block md:flex md:items-center ml-2">
                    <span className="text-white text-sm mr-1">Pidaus</span>
                    <div>
                      <svg
                        className="fill-current text-white h-4 w-4 block opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              isActive ? null : "hidden"
            } bg-sync-blue-600 md:block md:bg-white md:border-b`}
          >
            <div className="container mx-auto px-4">
              <div className="md:flex">
                <div className="flex -mb-px mr-8">
                  <a
                    href="/"
                    className="no-underline text-white md:text-sync-blue-700 flex items-center py-4 border-b border-sync-blue-700"
                  >
                    <FontAwesomeIcon icon="newspaper" className="mr-2" />
                    News Feed
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow container mx-auto px-4 md:px-24 pt-6 pb-8">
          {result ? (
            <InfiniteScroll
              pageStart={1}
              loadMore={this.loadMore.bind(this)}
              hasMore={this.state.hasMore}
              loader={<Loading />}
            >
              {result.map(d => (
                <div
                  key={d.id}
                  className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6 px-1 mb-2"
                >
                  <div className="py-1 px-1">
                    <span
                      className={`flex-auto rounded-full ${
                        d.feedType === "news" ? "bg-blue-500" : "bg-red-500"
                      } text-white uppercase px-2 py-1 text-xs font-bold mr-3 shadow`}
                    >
                      {d.feedType}
                    </span>
                  </div>
                  <div className="flex p-2 md:p-5">
                    <img
                      className={`h-8 w-8 rounded-full ${
                        d.sender.icon ? null : "bg-gray-400"
                      }`}
                      src={
                        d.sender.icon
                          ? d.sender.icon.path
                          : "https://images.vexels.com/media/users/3/152802/isolated/preview/4a12178b4182569cfb402bd969ff4965-classical-school-building-icon-by-vexels.png"
                      }
                    />
                    <div className="w-4/4 ml-2">
                      <div className="flex items-center">
                        <div>
                          <p className="text-sync-blue-700">
                            {d.sender.name} ({d.sender.abbrv})
                          </p>
                          <div className="text-gray-600 text-xs">
                            {moment(d.feedDate).calendar()}
                            {d.recipient.map(r =>
                              r.recipientPrivacy === "public" ? (
                                <FontAwesomeIcon
                                  icon="globe"
                                  className="m-auto ml-1"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon="lock"
                                  className="m-auto ml-1"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <span className="font-semibold mr-2 text-left flex-auto">
                          {d.title}
                        </span>
                      </div>
                      <div className="text-gray-800 text-sm py-3">{d.body}</div>
                      <div className="pt-5">
                        {" "}
                        <div className="text-gray-500">
                          {d.isDiscussionEnabled ? (
                            <React.Fragment>
                              <FontAwesomeIcon
                                icon="comment"
                                className="m-auto mr-1"
                              />
                              <span className="mr-3">
                                {d.unreadMessageCount}
                              </span>
                            </React.Fragment>
                          ) : (
                            <FontAwesomeIcon
                              icon="comment-slash"
                              className="m-auto mr-3"
                            />
                          )}
                          <FontAwesomeIcon
                            icon="paperclip"
                            className="m-auto mr-1"
                          />
                          <span className="mr-3">
                            {d.attachment.length + d.media.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          ) : (
            <Loading />
          )}
        </div>

        <div className="bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="md:flex justify-between items-center text-sm">
              <div className="py-4 text-gray-600">Design by Pidaus</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
