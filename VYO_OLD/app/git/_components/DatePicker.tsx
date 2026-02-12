import React, { useState } from 'react'
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'


export default () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          maximumDate={new Date()}
          minimumDate={new Date("1950-01-01")}
          onConfirm={(date) =>{
            setDate(date);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false)
          }}
      /> 
    </>
  )
}