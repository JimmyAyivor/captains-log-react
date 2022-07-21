import { useState, useEffect } from "react";
import Log from "./Log";
import axios from "axios";
// ^^ this is our new package for making API calls
const API = process.env.REACT_APP_API_URL;
// request for data must come AFTER component is loaded to the DOM
// otherwise we have a RACE condition  - page might be done before data arrives;
function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/logs`)
      .then((response) => {
        setLogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='Log'>
      <section>
        <table>
          <thead>
            <tr>
              <th>Mistakes</th>
              <th>Captain Name</th>
              <th>See this log</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              return <Log key={index} log={log} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Logs;
