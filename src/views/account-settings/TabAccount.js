// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { ErrorMessage, Form, useFormik, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [wifePhoto, setWifePhoto] = useState('/images/avatars/1.png')
  const [date, setDate] = useState(null)
  const [wifeDOB, setWifeDOB] = useState(null)

  const childrenInitialValues = {
    name: '',
    schoolName: '',
    dateOfBirth: '',
    ProfileSrc: '',
    Email: ''
  }
  const [childrens, setChildrens] = useState([])

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: 'John Doe',
      email: 'johnDoe@example.com',
      maritalStatus: 'unmarried',
      friends: ['jared']
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please Enter Name'),
      email: Yup.string().email('Please Enter Valid Email').required('Please Enter Valid Email'),
      maritalStatus: Yup.string().required('Please Select Marital Status')
    }),
    onSubmit: values => {
      console.log({ values })
    }
  })

  const onChange = (file, key) => {
    console.log(file, key)
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        if (key === 'man') setImgSrc(reader.result)
        else if (key === 'women') setWifePhoto(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  const addChildren = () => {
    setChildrens([...childrens, childrenInitialValues])
  }

  return (
    <CardContent>
      <Formik>
        <Form
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      onChange={e => onChange(e, 'man')}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled
                    color='error'
                    variant='outlined'
                    onClick={() => setImgSrc('/images/avatars/1.png')}
                  >
                    Reset
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Name'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='John Doe'
                defaultValue='John Doe'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                name='email'
                label='Email'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='johnDoe@example.com'
                defaultValue='johnDoe@example.com'
              />
              <ErrorMessage name='username' component='div' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerWrapper>
                <DatePicker
                  selected={date}
                  showYearDropdown
                  showMonthDropdown
                  id='account-settings-date'
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput />}
                  onChange={date => setDate(date)}
                />
              </DatePickerWrapper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  label='Marital Status'
                  defaultValue='unmarried'
                  name='maritalStatus'
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value='unmarried'>UnMarried</MenuItem>
                  <MenuItem value='married'>Married</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {values.maritalStatus === 'married' ? (
              <>
                <Grid item xs={12} sm={12}>
                  <Typography sx={{ fontWeight: 600 }}>Wife Details</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled src={wifePhoto} alt='Profile Pic' />
                    <Box>
                      <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-wife-image'>
                        Upload New Photo
                        <input
                          hidden
                          type='file'
                          onChange={e => onChange(e, 'women')}
                          accept='image/png, image/jpeg'
                          id='account-settings-upload-wife-image'
                        />
                      </ButtonStyled>
                      <ResetButtonStyled
                        color='error'
                        variant='outlined'
                        onClick={() => setWifePhoto('/images/avatars/1.png')}
                      >
                        Reset
                      </ResetButtonStyled>
                      <Typography variant='body2' sx={{ marginTop: 5 }}>
                        Allowed PNG or JPEG. Max size of 800K.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Name'
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='John Doe'
                    defaultValue='John Doe'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    name='email'
                    label='Email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='johnDoe@example.com'
                    defaultValue='johnDoe@example.com'
                  />
                  <ErrorMessage name='username' component='div' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePickerWrapper>
                    <DatePicker
                      selected={wifeDOB}
                      showYearDropdown
                      showMonthDropdown
                      id='account-settings-date'
                      placeholderText='MM-DD-YYYY'
                      customInput={<CustomInput />}
                      onChange={date => setWifeDOB(date)}
                    />
                  </DatePickerWrapper>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={addChildren}>
                    Add Children
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name='friends'
                    render={arrayHelpers => (
                      <Grid container spacing={7}>
                        {childrens?.map((children, index) => (
                          <>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                type='text'
                                label='Name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='john Doe'
                                defaultValue='John Doe'
                              />
                              <ErrorMessage name='username' component='div' />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                type='text'
                                label='School Name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='john Doe'
                                defaultValue='S.D. Jain School'
                              />
                              <ErrorMessage name='username' component='div' />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <DatePickerWrapper>
                                <DatePicker
                                  selected={date}
                                  showYearDropdown
                                  showMonthDropdown
                                  id={`account-settings-date-children-${index}`}
                                  placeholderText='MM-DD-YYYY'
                                  customInput={<CustomInput />}
                                  onChange={date => setDate(date)}
                                />
                              </DatePickerWrapper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                type='email'
                                label='Email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='johnDoe@example.com'
                                defaultValue='johnDoe@example.com'
                              />
                              <ErrorMessage name='username' component='div' />
                            </Grid>
                          </>
                        ))}
                      </Grid>
                    )}
                  />
                </Grid>
              </>
            ) : null}

            {openAlert ? (
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Alert
                  severity='warning'
                  sx={{ '& a': { fontWeight: 400 } }}
                  action={
                    <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                      <Close fontSize='inherit' />
                    </IconButton>
                  }
                >
                  <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                  <Link href='/' onClick={e => e.preventDefault()}>
                    Resend Confirmation
                  </Link>
                </Alert>
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <Button variant='contained' sx={{ marginRight: 3.5 }}>
                Save Changes
              </Button>
              <Button type='reset' variant='outlined' color='secondary'>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </CardContent>
  )
}

export default TabAccount
