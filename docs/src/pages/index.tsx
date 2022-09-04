import React from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import DocusaurusImageUrl from '@site/static/img/logo.png'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import { MuiChipsInput } from 'mui-chips-input'

import styles from './index.module.css'

import '../css/index.css'

const HomepageHeader = () => {
  const { siteConfig } = useDocusaurusContext()
  const [chips, setChips] = React.useState(['Apple', 'Peach', 'Banana'])

  const handleChange = (newChips: string[]) => {
    setChips(newChips)
  }

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          src={DocusaurusImageUrl as string}
          alt="Logo"
          width={120}
          height={120}
        />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className={clsx('hero__subtitle', styles.subtitle)}>
          A chips input designed for the React library{' '}
          <Link target="_blank" href="https://mui.com">
            MUI
          </Link>
          .
        </p>
        <MuiChipsInput label="Fruits" value={chips} onChange={handleChange} />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}

const Home = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
    </Layout>
  )
}

export default Home
