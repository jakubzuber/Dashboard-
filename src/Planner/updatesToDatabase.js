export const updateDatabaseSort = async(data) => {
    await fetch('/apiPostSort', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ID: data.ID,
            SORT: data.SORT 
        })
    })
    .then(res => res.json())
};

export const updateDatabaseRamp = async(data) => {
    await fetch('/apiPostRamp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ID: data.activeItem,
            RAMP: data.overContainer
        })
    })
    .then(res => res.json())
};