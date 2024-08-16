import React from 'react'
import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const CreateLesson = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label='Title' />
        <ReferenceInput source='unitId' reference='units' />
        <NumberInput source='order' validate={[required()]} label='Order'/>
      </SimpleForm>
    </Create>
  );
};
