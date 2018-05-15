import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'

export const ProjectPostTemplate = ({
  content,
  contentComponent,
  description,
  repo,
  project,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="project-content ">
            <h2 className="title">
              {title}
            </h2>
            <ul className="project-links">
            <li>
            <a href={repo} target="_blank">Repo</a>
            </li>
             <li>
            <a href={project} target="_blank">Visit Site</a>
            </li>
            </ul>
            <p>{description}</p>

            <PostContent content={content} />
            {tags && tags.length ? (
              <div className="tags" style={{ marginTop: `3rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ProjectPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  repo: PropTypes.string,
  project: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const ProjectPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <ProjectPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      repo={post.frontmatter.repo}
      project={post.frontmatter.project}
      helmet={<Helmet title={`${post.frontmatter.title} | Project`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
    />
  )
}

ProjectPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProjectPost

export const pageQuery = graphql`
  query ProjectPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        project
        repo
        tags
      }
    }
  }
`