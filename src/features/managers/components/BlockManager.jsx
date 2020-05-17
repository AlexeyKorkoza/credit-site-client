import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Input } from '../../../shared';
import { useBlockManager } from '../hooks';

const BlockManager = ({ isBlocked }) => {
  const [blockManager, formProps] = useBlockManager(isBlocked);
  const { handleSubmit, register } = formProps;

  return (
    <Card.Form>
      <Card.Form.Item>
        <Card.Form.Label htmlFor="isBlocked">Is Blocked</Card.Form.Label>
        <Input type="checkbox" name="isBlocked" register={register} />
      </Card.Form.Item>
      <Card.Form.Item>
        <Button onClick={handleSubmit(blockManager)}>Block</Button>
      </Card.Form.Item>
    </Card.Form>
  );
};

BlockManager.defaultProps = {
  isBlocked: false,
};

BlockManager.propTypes = {
  isBlocked: PropTypes.bool,
};

export default BlockManager;
