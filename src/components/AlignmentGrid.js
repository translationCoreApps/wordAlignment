import React, {Component} from 'react';
import PropTypes from 'prop-types';
// constants
import * as types from './WordCard/Types';
// components
import AlignmentCard from './AlignmentCard';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    padding: '0px 10px 10px',
    overflowY: 'auto',
    flexGrow: 2,
    alignContent: 'flex-start'
  }
};

/**
 * Renders a grid of word/phrase alignments
 */
class AlignmentGrid extends Component {
  render() {
    const {
      translate,
      actions,
      lexicons,
      alignments,
      contextId
    } = this.props;

    if (!contextId) {
      return <div/>;
    }
    // TODO: add support for dragging to left of card. See utils/dragDrop.js
    return (
      <div id='AlignmentGrid' style={styles.root}>
        {
          alignments.map((alignment, index) => {
            return (
              <React.Fragment key={index}>
                {/* placeholder for un-merging primary words */}
                {/* TODO: cannot place this here due to this bug https://github.com/react-dnd/react-dnd/issues/735*/}
                {/*<AlignmentCard*/}
                  {/*translate={translate}*/}
                  {/*alignmentIndex={index}*/}
                  {/*placeholderPosition="left"*/}
                  {/*bottomWords={[]}*/}
                  {/*topWords={[]}*/}
                  {/*onDrop={item => this.handleDrop(index, item)}*/}
                  {/*actions={actions}*/}
                  {/*lexicons={lexicons}*/}
                {/*/>*/}

                <AlignmentCard
                  translate={translate}
                  alignmentIndex={index}
                  bottomWords={alignment.bottomWords}
                  topWords={alignment.topWords}
                  onDrop={item => this.handleDrop(index, item)}
                  actions={actions}
                  lexicons={lexicons}
                />
                {/* placeholder for un-merging primary words */}
                <AlignmentCard
                  translate={translate}
                  alignmentIndex={index}
                  placeholderPosition="right"
                  bottomWords={[]}
                  topWords={[]}
                  onDrop={item => this.handleDrop(index, item)}
                  actions={actions}
                  lexicons={lexicons}
                />
              </React.Fragment>
            );
          })
        }
      </div>
    );
  }

  handleDrop(index, item) {
    const {onAlign, onMerge} = this.props;
    if (item.type === types.SECONDARY_WORD) {
      onAlign(index, item);
    }
    if (item.type === types.PRIMARY_WORD) {
      onMerge(item, item.alignmentIndex, index);
    }
  }
}

AlignmentGrid.propTypes = {
  onAlign: PropTypes.func.isRequired,
  onMerge: PropTypes.func.isRequired,
  alignments: PropTypes.array.isRequired,
  contextId: PropTypes.object,
  translate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  lexicons: PropTypes.object.isRequired
};

export default AlignmentGrid;
