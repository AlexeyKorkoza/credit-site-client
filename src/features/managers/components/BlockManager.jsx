import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button, Card, Input } from '../../../shared';
import { useManagersEditor } from '../hooks';
import { blockManagerSchema } from '../validation';

const BlockManager = ({
  isBlocked,
}) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      isBlocked,
    },
    validationSchema: blockManagerSchema,
  });
  const [,,, blockManager,] = useManagersEditor();

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
