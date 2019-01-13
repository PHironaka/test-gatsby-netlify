import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import FadeIn from 'react-fade-in';
import Layout from '../components/Layout'
import styled from "styled-components"

const BlogContent = styled.div` 
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 2em;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 800px) {
  grid-template-columns: 1fr ;
  }

  li {
    list-style-type: circle;
    margin-left: 15px;
  }
`

const Taglist = styled.ul` 
    margin-bottom: 0;

    li {
    list-style: none;

      margin: 1em 1em 2em 0;
      a {
        border: 1px solid #eee;
        padding: 8px 15px;
      }

    }
`

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  date,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
       <FadeIn>  
      {helmet || ''}
        <div className="columns">

          <BlogContent>
             <div >
            <h2 >
              {title}
            </h2>
             <p>{date}</p>

            <p>{description}</p>
            <PostContent content={content} />

            </div>


                        <div className="blog-container--credits">

            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <Taglist>
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </Taglist>
              </div>
            ) : null}
            </div>

        </BlogContent>

        </div>
        </FadeIn>  
        
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>

    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      date={post.frontmatter.date}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
    />
    </Layout>

  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`