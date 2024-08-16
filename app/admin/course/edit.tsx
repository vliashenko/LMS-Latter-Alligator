import React from 'react'
import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const EditCourse = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label='Id' />
        <TextInput source="title" validate={[required()]} label='Title' />
        <TextInput source="imageSrc" validate={[required()]} label='imageSrc' />
      </SimpleForm>
    </Edit>
  );
};
