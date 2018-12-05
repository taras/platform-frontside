import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Helmet from "react-helmet";

const PersonPage = ({
  data: {
    site: {
      siteMetadata: { title }
    },
    markdownRemark: {
      frontmatter: {
        name,
        title: personTitle,
        img,
        twitter,
        github,
        bio
      }
    }
  }
}) => {
  // const { markdownRemark: post } = data

  return (
    <Layout>
      <Helmet title={`Team | ${title}`} />
      <img src={img} alt={`${name}'s Portrait`} />
      <h1>{name}</h1>
      <div className="person-title">{personTitle}</div>
      <p>{bio}</p>
      <ul>
        <li><a href={`https://twitter.com/${twitter}`}>{twitter}</a></li>
        <li><a href={`https://github.com/${github}`}>{github}</a></li>
      </ul>
    </Layout>
  );
};

PersonPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default PersonPage;

export const peopleQuery = graphql`
  query PersonQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        name
        title
        img
        twitter
        github
        bio
      }
      fields {
        slug
        episodes {
          title
        }
        posts {
          frontmatter {
            title
          }
          fields {
            slug
            authors {
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  }
`;
