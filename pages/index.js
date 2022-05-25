import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"

import { team } from "../data"

Home.getInitialProps = async ({ query }) => {
  return { query }
}

export default function Home({ query }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inngest Demo</title>
      </Head>

      <main className={styles.main}>
        {query?.success && (
          <div
            className={[
              styles.notification,
              query.success === "true" ? styles.success : styles.failure,
            ].join(" ")}
          >
            {query.message}
          </div>
        )}
        <h1 className={styles.title}>Send a request</h1>

        <form action="/api/dispatch" method="post">
          <div className={styles.rowHeader}>
            <div>Team member</div>
            <div>Phone Number</div>
          </div>
          {team.map((person) => (
            <div key={person.id} className={styles.row}>
              <label>
                <input
                  type="checkbox"
                  id={`checkbox-${person.id}`}
                  name="ids"
                  value={person.id}
                />
                {person.name}
              </label>
              <div>{person.phone}</div>
            </div>
          ))}
          <div>
            <textarea
              className={styles.textarea}
              name="message"
              defaultValue="Are you available today at 9am? (y/n)"
            ></textarea>
          </div>
          <button className={styles.button} type="submit">
            Send dispatch
          </button>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.inngest.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inngest Docs
        </a>
      </footer>
    </div>
  )
}
