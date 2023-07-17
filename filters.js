/*
This file should not be used without sidebar.js
*/
filtersConfig = [
    {
      type: 'dropdown', 
      title: 'Terreinfunctie',
      columnHeader: 'Terreinfunctie',
      listItems: [
        'Nieuw bedrijventerrein',
        'Bestaand bedrijventerrein',
        'Infrastructuurwerken'
      ],
    },
  ]

function createFilterPopup(parent) {
  /*
  creates the filterpopup screen when pressing the filters button
  
  adds a filter button to the sidebar
  Note: you first have to run createSidebar() from sidebar.js
  */
  const div1 = document.createElement("div")
  div1.id = "modal"
  div1.classList.add('absolute', 'top', 'right', 'bottom', 'left', 'scroll-auto', 'hide-visually', 'flex-parent', 'flex-parent--center-main', 'mt120-ml')
  const div2 = document.createElement("div")
  div2.classList.add('pt36')
  const div3 = document.createElement("div")
  div3.classList.add('flex-child', 'bg-white', 'round', 'relative', 'scroll-auto')
  const exitButton = document.createElement("div")
  exitButton.id = "exitButton"
  exitButton.classList.add('absolute', 'top', 'right', 'px12', 'py12')
  const exitButtonImage = document.createElement("svg")
  exitButtonImage.classList.add('icon', 'link', 'color-darken50')
  exitButtonImage.innerHTML = "<use xlink:href='#icon-close'></use>"
  exitButtonImage.innerHTML = "x"
  
  exitButton.appendChild(exitButtonImage)
  
  const filtersForm = document.createElement("div")
  filtersForm.classList.add('px24', 'py24')
  const filters = document.createElement("form")
  filters.id = 'filters'
  const div4 = document.createElement("div")
  div4.classList.add('align-center', 'py12')
  const div5 = document.createElement("div")
  div5.classList.add('flex-parent', 'flex-parent--center-main')
  const resetButton = document.createElement("button")
  resetButton.id = 'removeFilters'
  resetButton.classList.add('btn')
  resetButton.innerHTML = 'Filters Resetten'
  
  div5.appendChild(resetButton)
  
  filtersForm.appendChild(filters)
  filtersForm.appendChild(div4)
  filtersForm.appendChild(div5)
  
  div3.appendChild(exitButton)
  div3.appendChild(filtersForm)
  
  div2.appendChild(div3)
  div1.appendChild(div2)
  parent.appendChild(div1)

  // add button in sidebar
  const buttonDiv = document.getElementById('buttonDiv')
  const button = document.createElement("button")
  button.id = 'filterResults'
  button.classList.add('txt-bold', 'btn', 'btn--stroke', 'mr0-m1', 'mr12', 'px18-ml', 'px6')
  const buttonImage = document.createElement("svg")
  buttonImage.classList.add('icon', 'inline-block', 'align-middle', 'h24', 'w24')
  const use = document.createElement("use")
  buttonImage.innerHTML = "<use href='#icon-filter'></use>"
  const buttonText = document.createElement("p")
  buttonText.classList.add('inline-block-ml', 'align-middle', 'remove', 'none')
  buttonText.innerHTML = 'Toon filters'
  button.appendChild(buttonImage)
  button.appendChild(buttonText)
  buttonDiv.appendChild(button)
}

function buildDropDownList(title, listItems) {
  const filtersDiv = document.getElementById('filters');
  const mainDiv = document.createElement('div');
  const filterTitle = document.createElement('h3');
  filterTitle.innerText = title;
  filterTitle.classList.add('py12', 'txt-bold');
  mainDiv.appendChild(filterTitle);

  const selectContainer = document.createElement('div');
  selectContainer.classList.add('select-container', 'center');

  const dropDown = document.createElement('select');
  dropDown.classList.add('select', 'filter-option');

  const selectArrow = document.createElement('div');
  selectArrow.classList.add('select-arrow');

  const firstOption = document.createElement('option');

  dropDown.appendChild(firstOption);
  selectContainer.appendChild(dropDown);
  selectContainer.appendChild(selectArrow);
  mainDiv.appendChild(selectContainer);

  for (let i = 0; i < listItems.length; i++) {
    const opt = listItems[i];
    const el1 = document.createElement('option');
    el1.textContent = opt;
    el1.value = opt;
    dropDown.appendChild(el1);
  }
  filtersDiv.appendChild(mainDiv);
}

function buildCheckbox(title, listItems) {
  const filtersDiv = document.getElementById('filters');
  const mainDiv = document.createElement('div');
  const filterTitle = document.createElement('div');
  const formatcontainer = document.createElement('div');
  filterTitle.classList.add('center', 'flex-parent', 'py12', 'txt-bold');
  formatcontainer.classList.add(
    'center',
    'flex-parent',
    'flex-parent--column',
    'px3',
    'flex-parent--space-between-main',
  );
  const secondLine = document.createElement('div');
  secondLine.classList.add(
    'center',
    'flex-parent',
    'py12',
    'px3',
    'flex-parent--space-between-main',
  );
  filterTitle.innerText = title;
  mainDiv.appendChild(filterTitle);
  mainDiv.appendChild(formatcontainer);

  for (let i = 0; i < listItems.length; i++) {
    const container = document.createElement('label');

    container.classList.add('checkbox-container');

    const input = document.createElement('input');
    input.classList.add('px12', 'filter-option');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', listItems[i]);
    input.setAttribute('value', listItems[i]);

    const checkboxDiv = document.createElement('div');
    const inputValue = document.createElement('p');
    inputValue.innerText = listItems[i];
    checkboxDiv.classList.add('checkbox', 'mr6');
    checkboxDiv.appendChild(Assembly.createIcon('check'));

    container.appendChild(input);
    container.appendChild(checkboxDiv);
    container.appendChild(inputValue);

    formatcontainer.appendChild(container);
  }
  filtersDiv.appendChild(mainDiv);
}

const selectFilters = [];
const checkboxFilters = [];

function createFilterObject(filterSettings) {
  filterSettings.forEach((filter) => {
    if (filter.type === 'checkbox') {
      const keyValues = {};
      Object.assign(keyValues, {
        header: filter.columnHeader,
        value: filter.listItems,
      });
      checkboxFilters.push(keyValues);
    }
    if (filter.type === 'dropdown') {
      const keyValues = {};
      Object.assign(keyValues, {
        header: filter.columnHeader,
        value: filter.listItems,
      });
      selectFilters.push(keyValues);
    }
  });
}

function applyFilters() {
  const filterForm = document.getElementById('filters');

  filterForm.addEventListener('change', function () {
    const filterOptionHTML = this.getElementsByClassName('filter-option');
    const filterOption = [].slice.call(filterOptionHTML);

    const geojSelectFilters = [];
    const geojCheckboxFilters = [];

    filteredGeojson.features = [];
    // const filteredFeatures = [];
    // filteredGeojson.features = [];

    filterOption.forEach((filter) => {
      if (filter.type === 'checkbox' && filter.checked) {
        checkboxFilters.forEach((objs) => {
          Object.entries(objs).forEach(([, value]) => {
            if (value.includes(filter.value)) {
              const geojFilter = [objs.header, filter.value];
              geojCheckboxFilters.push(geojFilter);
            }
          });
        });
      }
      if (filter.type === 'select-one' && filter.value) {
        selectFilters.forEach((objs) => {
          Object.entries(objs).forEach(([, value]) => {
            if (value.includes(filter.value)) {
              const geojFilter = [objs.header, filter.value];
              geojSelectFilters.push(geojFilter);
            }
          });
        });
      }
    });

    if (geojCheckboxFilters.length === 0 && geojSelectFilters.length === 0) {
      geojsonData.features.forEach((feature) => {
        filteredGeojson.features.push(feature);
      });
    } else if (geojCheckboxFilters.length > 0) {
      geojCheckboxFilters.forEach((filter) => {
        geojsonData.features.forEach((feature) => {
          if (feature.properties[filter[0]].includes(filter[1])) {
            if (
              filteredGeojson.features.filter(
                (f) => f.properties.id === feature.properties.id,
              ).length === 0
            ) {
              filteredGeojson.features.push(feature);
            }
          }
        });
      });
      if (geojSelectFilters.length > 0) {
        const removeIds = [];
        filteredGeojson.features.forEach((feature) => {
          let selected = true;
          geojSelectFilters.forEach((filter) => {
            if (
              feature.properties[filter[0]].indexOf(filter[1]) < 0 &&
              selected === true
            ) {
              selected = false;
              removeIds.push(feature.properties.id);
            } else if (selected === false) {
              removeIds.push(feature.properties.id);
            }
          });
        });
        let uniqueRemoveIds = [...new Set(removeIds)];
        uniqueRemoveIds.forEach(function (id) {
          const idx = filteredGeojson.features.findIndex(
            (f) => f.properties.id === id,
          );
          filteredGeojson.features.splice(idx, 1);
        });
      }
    } else {
      geojsonData.features.forEach((feature) => {
        let selected = true;
        geojSelectFilters.forEach((filter) => {
          if (
            !feature.properties[filter[0]].includes(filter[1]) &&
            selected === true
          ) {
            selected = false;
          }
        });
        if (
          selected === true &&
          filteredGeojson.features.filter(
            (f) => f.properties.id === feature.properties.id,
          ).length === 0
        ) {
          filteredGeojson.features.push(feature);
        }
      });
    }

    map.getSource('locationData').setData(filteredGeojson);
    buildLocationList(filteredGeojson);
  });
}

function filters(filterSettings) {
  filterSettings.forEach((filter) => {
    if (filter.type === 'checkbox') {
      buildCheckbox(filter.title, filter.listItems);
    } else if (filter.type === 'dropdown') {
      buildDropDownList(filter.title, filter.listItems);
    }
  });
}

function removeFilters() {
  const input = document.getElementsByTagName('input');
  const select = document.getElementsByTagName('select');
  const selectOption = [].slice.call(select);
  const checkboxOption = [].slice.call(input);
  filteredGeojson.features = [];
  checkboxOption.forEach((checkbox) => {
    if (checkbox.type === 'checkbox' && checkbox.checked === true) {
      checkbox.checked = false;
    }
  });

  selectOption.forEach((option) => {
    option.selectedIndex = 0;
  });

  map.getSource('locationData').setData(geojsonData);
  buildLocationList(geojsonData);
}

function removeFiltersButton() {
  const removeFilter = document.getElementById('removeFilters');
  removeFilter.addEventListener('click', () => {
    removeFilters();
  });
}

function setupFilter(filterSettings) {
  createFilterObject(filterSettings);
  applyFilters();
  filters(filterSettings);
  removeFiltersButton();
  // Modal - popup for filtering results
  const filterResults = document.getElementById('filterResults');
  const exitButton = document.getElementById('exitButton');
  const modal = document.getElementById('modal');
    
  filterResults.addEventListener('click', () => {
    modal.classList.remove('hide-visually');
    modal.classList.add('z5');
  });
    
  exitButton.addEventListener('click', () => {
    modal.classList.add('hide-visually');
  });
}

