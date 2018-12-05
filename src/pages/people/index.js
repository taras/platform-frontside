import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import Img from "gatsby-image"

const PeoplePage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  }
}) => {

  let alumni = group
    .find(({ fieldValue }) => fieldValue === "true")
    .edges
    .map(({ node }) => node);

  let team = group
    .find(({ fieldValue }) => fieldValue === "undefined")
    .edges
    .map(({ node }) => node);


  return (
    <Layout>
      <Helmet title={`Team | ${title}`} />
      <h1>Team</h1>
      <ul>
        {team.map(person => (
          <li key={person.frontmatter.name}>
            <Img fixed={person.frontmatter.img.childImageSharp.fixed} />
            <Link to={person.fields.slug}>
              {person.frontmatter.name}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Alumni</h2>
      <ul>
        {alumni.map(person => (
          <li key={person.frontmatter.name}>
            <Img fixed={person.frontmatter.img.childImageSharp.fixed} />
            <Link to={person.fields.slug}>
              {person.frontmatter.name}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default PeoplePage;

export const peoplePageQuery = graphql`
  query PeopleListQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/people/" } }) {
      group(field: frontmatter___alumnus) {
        fieldValue
        edges {
          node {
            frontmatter {
              name
              title
              img {
                childImageSharp {
                  fixed(width: 300) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;
