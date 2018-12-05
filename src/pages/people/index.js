import React from 'react'
// import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { /* Link, */ graphql } from 'gatsby'
import Layout from '../../components/Layout'

const PeoplePage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`People | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">People</h1>
            <ul className="taglist">
              {/* {group.map(tag => (
                <li key={tag.fieldValue}>
                  <Link to={`/people/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default PeoplePage

export const peoplePageQuery = graphql`
  query PeopleListQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
