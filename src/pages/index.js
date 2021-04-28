import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

import LogicRunner from '../components/logic-runner'


const features = [
  {
    title: 'Fast, Powerful & Persistable Logic',
    description: (<>
      Using a lisp-like language created using JSON, you can use this engine to define rules &amp; sets of logic to power your applications.
      <br/>
      <br/>
      This makes it easy to persist safe instructions in a database, and provide custom processing for your customers.
      <br/>
      <br/>
      This module supports both synchronous &amp; asynchronous versions of the engine, so that you may run advanced processes that may involve fetching data from endpoints.
      <br/>
      <br/>
      Additionally, the module supports function compilation to try to get near-native performance wherever it can.
      <br/>
      <br/>

      <pre style={{ background: '#001627', color: '#308AFF', padding: '10px'}}>
      npm install json-logic-engine <br/>
      -- or -- <br/>
      yarn add json-logic-engine
      </pre>
    </>)
  },
 
  {
    title: 'Runs in the Browser & in Node',
    description: (
      <>
        <LogicRunner defaultLogic={{
          'and': [
            {
              '>=': [{var: 'approvedBy.accountants' }, 3]
            },
            {
              var: 'approvedBy.ceo'
            }
          ]
        }} defaultData={{
          approvedBy: {
            accountants: 3,
            ceo: 1
          }
        }} />
      </>
    )
  }
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Fast, Powerful &amp; Persistable Logic">
      <div className={styles.hero}>
        <header>
          <h1>{siteConfig.title}</h1>
          <p>{siteConfig.tagline}</p>

          <div className={styles.buttons}>
            <Link to={useBaseUrl('docs/')}>Get Started</Link>
          </div>
        </header>
        <main>
          {features && features.length > 0 && (
            <section className={styles.section}>
              <div className={styles.features}>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </Layout>
  );
}
