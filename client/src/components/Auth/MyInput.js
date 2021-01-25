import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

const MyInput = field => {
    const hasError = field.meta.touched && field.meta.error;
    if (!hasError)
        return (
            < TextField
                variant="outlined"
                margin="normal"
                fullWidth
                {...field}
                {...field.input}
            ></TextField >
        )
    else
        return (
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                {...field}
                {...field.input}
                error
                helperText={field.meta.error}
            ></TextField>
        )
}
export default MyInput