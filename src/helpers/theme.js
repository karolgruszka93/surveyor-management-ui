
import { createMuiTheme } from "@material-ui/core";
import styled from 'styled-components';

export const Button = styled.div`
    margin: 0.2em 0.2em 0.2em 0.2em;
    color:  #FFFFFF;
    padding: 0.5em;
    background: ${props => props.color || '#2b2e39'};
    border: 0.1em solid ${props => props.color || '#2b2e39'};
    border-radius: 0.4em;
    display: inline-block;
    transition: all 0.3s ease 0s;
    cursor: default;

    &:hover {
        color: #28DD5E;
        border-radius: 0.1em;
        border-color: #28DD5E;
        transition: all 0.3s ease 0s;
    }

    &:active {
        color:  #FFFFFF;
        background: #28DD5E;
    }
    `

export const NavButton = styled(Button)`
    margin: 0.5em 0.2em 0.5em 0.2em;
    height: 4.7em;
    width: 9.1em;
    border: 0.2em solid ${props => props.color || '#2b2e39'};
    border-radius: 0.6em;
    font-size: 25px;
    text-transform: uppercase;
    line-height: 1.8em;
    `

export const Input = styled.input`
    display: inline-block;    
    margin: 0.2rem 0.2rem 0.2rem 0.2rem;
    color:  #FFFFFF;
    background: #2b2e39;
    font-size: 1rem;
    text-indent: 0.4rem;
    border: 0.05rem solid ${props => props.color || '#FFFFFF'};
    border-radius: 0.3rem;
    outline: none;
    width: ${props => props.width ? props.width : 'auto'};
    height: ${props => props.height ? props.height : 'auto'};
    
    &:hover {
        color: #28DD5E;
        border-radius: 0.1em;
        border-color: #28DD5E;
        transition: all 0.3s ease 0s;
        text-indent: 0.8rem;
    }

    &:focus {
        color: #28DD5E;
        border-radius: 0.1em;
        border-color: #28DD5E;
        transition: all 0.3s ease 0s;
        text-indent: 0.8rem;
    }
    `

export const HorizontalLine = styled.hr`
    border: 0.01em solid #3c3f4a;
    `

export const Paragraph = styled.p`
    font-size: 22px;
    `

export const Error = styled.div`
    font-size: 12px;
    color: #D12426;
    `

export const SelectStyle = {
    container: () => ({
        display: 'inline-block',
        width: '20.7em',
        height: '2.1rem',
        margin: '0.2rem 0.2rem 0.2rem 0.2rem',
        fontSize: '1rem',
        border: '0.05rem solid',
        borderRadius: '0.3rem',
        color: '#A9A9A9',
        '&:hover': {
            color: '#28DD5E',
            borderRadius: '0.1rem',
        },
        '&:focus': {
            color: '#28DD5E',
            borderRadius: '0.1rem'
        }
    }),

    control: () => ({
        margin: '0.2rem 0.2rem 0.2rem 0.2rem',
        width: '20.2rem',
        height: '1.8rem',
        background: '#2b2e39'
    }),

    valueContainer: () => ({
        display: 'inline-block',
        verticalAlign: 'top',
        width: '19rem',
        height: '1.8rem',
        background: '#2b2e39'
    }),

    indicatorsContainer: () => ({
        display: 'inline-block',
        verticalAlign: 'top',
        width: '1.2rem',
        height: '1.8rem',
        background: '#2b2e39'
    }),

    dropdownIndicator: () => ({
        width: '1.2rem',
        height: '1.8rem',
        background: '#2b2e39'
    }),

    singleValue: () => ({
        display: 'fixed',
        alignItems: 'center',
        height: '1.7rem',
        background: '#2b2e39',
        fontSize: '1.1rem',
        textIndent: '0.2rem',
        color: '#FFFFFF'
    }),

    menu: () => ({
        display: 'inline-block',
        color: '#808080',
        background: '#2b2e39',
        width: '20.5rem',
        border: '0.05rem solid #A9A9A9',
    }),

    option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? '#4A5F6D' : '#2b2e39',
        '&:active': {
            background: '#28DD5E',
        }
    }),
}

export const MuiTheme = createMuiTheme({
    palette: {
        text: { primary: '#FFFFFF' },
    },
    overrides: {
        MuiInput: {
            underline: {
                "&:before": {
                    borderBottom: `1px solid #FFFFFF`,
                },
                "&:after": {
                    borderBottom: `1px solid #28DD5E`,
                },
                "&:hover:not(.Mui-disabled):before": {
                    borderBottom: `1px solid #28DD5E`,
                },
            },
        },
        MuiInputBase: {
            input: {
                textOverflow: 'ellipsis',
                "&:hover": {
                    color: '#28DD5E',
                },
            },
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#28DD5E',
            },
        },
        MuiIconButton: {
            root: {
                color: '#FFFFFF',
                '&$disabled': {
                    color: '#82848a',
                },
                "&:hover": {
                    color: '#28DD5E',
                },
            },
            colorInherit: {
                color: '#FFFFFF',
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: '#2b2e39',
            },
            elevation2: {
                boxShadow: 'none',
            },
        },
        MuiMenuItem: {
            root: {
                "&:hover": {
                    color: '#28DD5E',
                },
            },
        },
        MuiCircularProgress: {
            colorPrimary: {
                color: '#28DD5E',
            },
        },
        MuiTableSortLabel: {
            root: {
                color: '#FFFFFF',
                "&:hover": {
                    color: '#28DD5E',
                },
                "&:focus": {
                    color: '#28DD5E',
                },
                "&$active": {
                    color: '#FFFFFF',
                    '&& $icon': {
                        color: '#FFFFFF',
                    },
                },
            },
        },
        MuiButton: {
            root: {
                color: '#FFFFFF',
                "&:hover": {
                    color: '#28DD5E',
                },
            },
            contained: {
                '&$disabled': {
                    color: '#82848a',
                },
            },
            textPrimary: {
                color: '#FFFFFF',
                "&:hover": {
                    color: '#28DD5E',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiSelect: {
            icon: {
                color: '#FFFFFF',
            },
            select: {
                minWidth: '180px',
            },
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: '#28DD5E',
                "&:hover": {
                    color: '#28DD5E',
                    backgroundColor: '#2b2e39',
                },
            },
            current: {
                color: '#7093A8',
            },
        },
        MuiPickersCalendarHeader: {
            dayLabel: {
                color: '#82848a',
            },
            iconButton: {
                backgroundColor: '#2b2e39',
            },
        },
        MuiTableCell: {
            alignLeft: {
                textOverflow: 'auto',
                whiteSpace: 'normal',
                overflow: 'hidden',
                maxWidth: 180,
            },
        },
        MuiSnackbarContent:
        {
            root: {
                backgroundColor: '#4A5F6D',
                display: 'block',
            },
        },

        MuiCheckbox: {
            colorSecondary: {
                color: '#FFFFFF',
                '&$checked': {
                    color: '#28DD5E',
                },
            },
        },

        MuiDivider: {
            root: {
                backgroundColor: '#82848a',
                margin: '0.8em'
            },
        },

        MuiListItemText: {
            primary: {
                fontSize: '0.8rem',
            }
        },
        
        MuiListItem: {
            root: {
                paddingTop: '0rem',
                paddingBottom: '0rem',
            }
        },

        MuiBadge: {
            root: {
                color: '#FFFFFF',
                "&:hover": {
                    color: '#28DD5E',
                },
            },
        },

        MuiFilledInput: {
            input: {
                fontSize: `0.9em`,
            },
            underline: {
                "&:before": {
                    borderBottom: `1px solid #FFFFFF`,
                },
                "&:after": {
                    borderBottom: `1px solid #28DD5E`,
                },
                "&:hover:not(.Mui-disabled):before": {
                    borderBottom: `1px solid #28DD5E`,
                },
            },
        },

        MuiFormLabel: {
            root: {
                fontSize: `0.8em`,
                color: `#82848a`,
                '&$focused': {
                    color: '#28DD5E',
                },
            },
        },
             
    },
});
