const { chain: $, append } = require('funcadelic');
const slugify = require('slugify');

const bySlugPredicate = regEx => node => node.fields.slug && regEx.test(node.fields.slug)

exports.sourceNodes = function sourceNodes({ boundActionCreators, getNodes, getNode }) {
  const { createNodeField } = boundActionCreators;

  let $nodes = $(getNodes());

  let $markdownFiles = $nodes.filter(node => node.internal.type === 'MarkdownRemark')

  let people = $markdownFiles
    .filter(bySlugPredicate(/^\/people/))
    .map(node => append(node, {
      get slug() {
        return slugify(node.frontmatter.name, {
          lower: true
        })
      }
    }));

  let peopleBySlug = people.valueOf().reduce((people, person) => ({
    ...people,
    [person.slug]: person
  }), {});

  let posts = $markdownFiles
    map(node => append(node, {
      get authors() {
        return node.frontmatter.author.split(', ')
      }
    }))
    .filter(bySlugPredicate(/^\/blog/));

  let episodes = $nodes
    .filter(node => node.internal.type === 'SimplecastEpisode');



  console.log(markdownNodes);
};