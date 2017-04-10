import React, { PropTypes, Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { operateOnItem } from '../report.js';

const withReport = component => {

  return graphql(gql`
    mutation report($documentId: String, $reportType: String, $collectionName: String) {
      report(documentId: $documentId, reportType: $reportType, collectionName: $collectionName) {
        ... on Post {
          _id
          reports
          reporters {
            _id
          }
          reportBaseScore
        }
        ... on Comment {
          _id
          reports
          reporters {
            _id
          }
          reportBaseScore
        }
      }
    }
  `, {
    props: ({ownProps, mutate}) => ({
      report: ({document, reportType, collection, currentUser}) => {
        const reportResult = operateOnItem(collection, document, currentUser, reportType, true);
        return mutate({
          variables: {
            documentId: document._id,
            reportType,
            collectionName: collection._name,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            report: {
              ...reportResult,
            },
          }
        })
      }
    }),
  })(component);
}

export default withReport;
