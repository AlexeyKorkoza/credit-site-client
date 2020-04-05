import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button, Card, Input } from '../../../shared';
import { UserContext } from '../../../core';
import { removeClientSchema } from '../validation';
import { useClientEditor } from '../hooks';

const DeletionClient = ({ action, isRemoved }) => {
  const context = useContext(UserContext);
  const { role } = context;
  const [,,,, markClientForDeletion] = useClientEditor();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      isRemoved,
    },
    validationSchema: removeClientSchema,
  });

  return (
    <>
      {role === 'manager' && action === 'edit' && (
      <Card.Form>
        <Card.Form.Item>
          <Card.Form.Label htmlFor="isRemoved">Mark the client for deletion</Card.Form.Label>
          <Input
            type="checkbox"
            name="isRemoved"
            checked={isRemoved}
            register={register}
          />
        </Card.Form.Item>
        <Card.Form.Item>
          <Button onClick={handleSubmit(markClientForDeletion)}>Mark</Button>
        </Card.Form.Item>
      </Card.Form>
      )}
    </>
  );
};

DeletionClient.defaultProps = {
  action: PropTypes.string,
  isRemoved: PropTypes.bool,
};

DeletionClient.propTypes = {
  action: PropTypes.string,
  isRemoved: PropTypes.bool,
};

export default DeletionClient;
