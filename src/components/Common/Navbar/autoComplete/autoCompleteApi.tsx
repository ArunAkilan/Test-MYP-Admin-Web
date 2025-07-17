// AutoCompleteWithSelect.tsx
import  { useState, useEffect, useMemo } from 'react';
import {
    Autocomplete,
    TextField,
    CircularProgress,
    Select,
    MenuItem,
    Box,
    Typography,
    Grid,
} from '@mui/material';
import axios from 'axios';
//@ts-ignore
import debounce from 'lodash.debounce';
import { useLocation, useNavigate } from 'react-router-dom';

interface OptionType {
    id: string | number;
    title: string | null;
    category: string;

}

export default function AutoCompleteWithSelect() {
    const [inputValue, setInputValue] = useState<any>(null);
    const [options, setOptions] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectValue, setSelectValue] = useState('all');

    const fetchOptions = useMemo(() => {
        return debounce(async (value: string) => {
            if (!value) return;
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3002/api/suggestions?query=${encodeURIComponent(
                    value
                )}&type=${selectValue}`);

                const allResults: any = [];
                //let results:any = [];
                for (const category in response.data.suggestions) {
                    console.log("category", category);
                    const items = response.data.suggestions[category].slice(0, 7);
                    console.log("items", items);
                    items.forEach((item: any) => {
                        allResults.push({
                            ...item,
                            category,
                        });
                    });
                }
                const results = allResults.map((item: any) => ({
                    title: item.title,
                    category: item.propertyCategory,
                    id: item.id,
                }));
                console.log("resultsssssss", results);
                setOptions([...results]);
                console.log("options", options);
            } catch (error) {
                console.error('API fetch error:', error);
            }
            setLoading(false);
        }, 500)
    }, [selectValue]);

   

    useEffect(() => {
        if (inputValue?.title?.trim() === '') {
            setOptions([]); // ✅ clear suggestions when input is empty
            return;
        }

        fetchOptions(inputValue); // ✅ call API only for actual input
    }, [inputValue]);

    const navigate = useNavigate();
    const routeName = useLocation();
    const handleChange = (event: any, newValue: any, reason: any) => {
        console.log(newValue, "+++++", event);
        if((newValue !== null && (`/${newValue?.category}`) !== routeName.pathname)){
          navigate(`/${newValue?.category}`);
        }
        setInputValue(newValue);
        if (reason === 'clear') {
            setOptions([]); // ✅ clear suggestions manually
        }

    };

    return (
        <Grid container alignItems="center" sx={{ width: '100%' }}>
            {/* Select Dropdown */}
            <Grid item xs={12} sm={3}>
                <Select
                    labelId="select-label"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    sx={{
                        height: 36, // total height of select box
                        '& .MuiSelect-select': {
                            padding: '6px 8px', // controls internal text padding
                            minHeight: 'unset',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ccc', // optional
                            borderTopRightRadius: '0px !important',
                            borderBottomRightRadius: '0px !important',
                        },
                        '& .MuiInputBase-root': {
                            height: 36
                        },
                    }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="commercial">Commercials</MenuItem>
                    <MenuItem value="residential">Residentials</MenuItem>
                    <MenuItem value="plot">Plots</MenuItem>
                </Select>
            </Grid>
            {/* Autocomplete */}
            <Grid item xs={12} sm={8}>
                <Autocomplete
                    freeSolo
                    key={selectValue}
                    options={options}
                    // getOptionLabel={(option) => {
                    //     if (typeof option === 'string') return option;
                    //     return `${option.title}`;
                    // }}
                    getOptionLabel={(option) =>
                      typeof option === 'string' ? option : option?.title || ''
                    }
                    filterOptions={(x) => x}

                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={handleChange}
                    loading={loading}
                    sx={{
                        '& .MuiInputBase-root': {
                            height: 36,
                            '& fieldset': {
                                 borderTopLeftRadius: '0px !important',
                                 borderBottomLeftRadius: '0px !important',
                            },
                        },
                        '& .MuiInputBase-input': {
                            padding: '6px 8px',
                            fontSize: '0.875rem',
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Search here"
                            label="" // empty label
                            size="small"
                            InputLabelProps={{ shrink: false }} // optional
                            onChange={(e) => setInputValue(e.target.value)}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress size={20} color="inherit" /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            {...props}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                padding: 1,
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontFamily: "Raleway" }} fontWeight="bold">
                                    {option.title}
                                </Typography>
                                <Typography sx={{ fontFamily: "Raleway" }} color="text.secondary">
                                    {option.category}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                />

            </Grid>
        </Grid>
    );
}
