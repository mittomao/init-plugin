(function($) {
  const APICaller = function () {
    const mockContainer = new MockApiContainer();

    function callMockApi(url, param, handleCallApiSuccess, handleCallApiFail) {

      setTimeout(() => {
        let responseObj;
        const apiUrl = url.split('/').pop();

        // eslint-disable-next-line prefer-const
        responseObj = mockContainer.call(apiUrl, param);

        if (responseObj.status === 200) {
          handleCallApiSuccess(responseObj);
        } else {
          handleCallApiFail(responseObj);
        }
      }, 1000);
    }

    // eslint-disable-next-line max-len
    APICaller.prototype.call = function (url, method, param, handleCallApiSuccess, handleCallApiFail) {
      if (url.indexOf('http://localhost:4999') > -1) {
        callMockApi(url, param, handleCallApiSuccess, handleCallApiFail);
      } else {
        $.ajax({
          contentType: method.toUpperCase() === 'POST' ? 'application/json' : '',
          url,
          dataType: 'json',
          data: JSON.stringify(param),
          type: method || 'GET',
          async: true,
          success(response) {
            const { errorCode, errorMessage } = response;

            if (errorCode) {
              handleCallApiFail(errorMessage);
              return;
            }

            handleCallApiSuccess(response);
          },
          error(err) {
            handleCallApiFail(err);
          },
        });
      }
    };
  };

  const MockApiContainer = function () {
    const mockApiContainer = {
      'get-our-centre': getOurCentre,
      'submit-register': submitRegister,
    };

    MockApiContainer.prototype.call = function (url, param) {
      if (mockApiContainer[url]) {
        return mockApiContainer[url](param);
      } else {
        throw Error('Please define mock api in mockApiContainer');
      }
    };

    function getOurCentre(param) {
      const result =  {
        "filters":{
          "name":"",
          "date":"2022-06-10",
          "areas":[
            {
              "id":10,
              "name":"North",
              "isSelected":false
            },
            {
              "id":27,
              "name":"South",
              "isSelected":false
            }
          ],
          "districts":[
            {
              "id":9,
              "name":"Dong Da",
              "areaTermId":10,
              "isSelected":false
            },
            {
              "id":10,
              "name":"Hoan Kiem",
              "areaTermId":10,
              "isSelected":false
            },
            {
              "id":11,
              "name":"Tay Ho",
              "areaTermId":27,
              "isSelected":false
            }
          ],
          "features":[
            {
              "id":11,
              "name":"Spark Commendation",
              "isSelected":false
            },
            {
              "id":12,
              "name":"Malay MTL",
              "isSelected":false
            },
            {
              "id":13,
              "name":"Tamil MTL",
              "isSelected":true
            }
          ],
          "vacancy":false,
          "programmes":[
            {
              "id":72,
              "name":"Infant care",
              "ageGroups":"2 months to 17 months",
              "code":"I",
              "minMonth":2,
              "maxMonth":17,
              "isSelected":true
            },
            {
              "id":73,
              "name":"Toddler",
              "ageGroups":"18 months to 30 months",
              "code":"T",
              "minMonth":18,
              "maxMonth":30,
              "isSelected":true
            },
            {
              "id":74,
              "name":"Playgroup",
              "ageGroups":"30 months to 3 years old",
              "code":"PG",
              "minMonth":30,
              "maxMonth":36,
              "isSelected":true
            },
            {
              "id":75,
              "name":"Nursery",
              "ageGroups":"4 years old",
              "code":"N",
              "minMonth":48,
              "maxMonth":59,
              "isSelected":true
            },
            {
              "id":76,
              "name":"K1 Programme",
              "ageGroups":"5 years old",
              "code":"K1",
              "minMonth":60,
              "maxMonth":71,
              "isSelected":true
            },
            {
              "id":77,
              "name":"K2 Programme",
              "ageGroups":"6 years old",
              "code":"K2",
              "minMonth":72,
              "maxMonth":120,
              "isSelected":false
            }
          ],
          "promotion":true
        },
        "items":[
          {
            "post_id":10,
            "title":"1: Alarm Centre Title A MOM",
            "name":"Alarm Centre C",
            "code":"ALC",
            "latitude":1,
            "longitude":1,
            "image":"http://ec2-3-0-54-171.ap-southeast-1.compute.amazonaws.com/wp-content/uploads/2022/05/Image1.png",
            "promotion":true,
            "vacancyCount":2,
            "vacancyStatus":"Limited",
            "slug": "center-1"
          },
          {
            "post_id":251,
            "title":"2: Mom love you",
            "name":"Mom love you",
            "code":"MLY",
            "latitude":2,
            "longitude":2,
            "image":"http://ec2-3-0-54-171.ap-southeast-1.compute.amazonaws.com/wp-content/uploads/2022/05/Image2.png",
            "promotion":true,
            "vacancyCount":0,
            "vacancyStatus":"Full",
            "slug": "center-2"
          },
          {
            "post_id":10,
            "title":"3: Mother care",
            "name":"Mother care",
            "code":"MC",
            "latitude":1,
            "longitude":1,
            "image":"",
            "promotion":true,
            "vacancyCount":0,
            "vacancyStatus":"Full",
            "slug": "center-3"
          },
          {
            "post_id":10,
            "title":"4: New Life As Mom",
            "name":"New Life",
            "code":"NL",
            "latitude":2,
            "longitude":2,
            "image":"",
            "promotion":true,
            "vacancyCount":10,
            "vacancyStatus":"Vacancies"
          },
          {
            "post_id":238,
            "title":"5: Alarm Centre Title A MOM",
            "name":"Alarm Centre C",
            "code":"ALC",
            "latitude":1,
            "longitude":1,
            "image":"",
            "promotion":true,
            "vacancyCount":2,
            "vacancyStatus":"Limited"
          },
          {
            "post_id":251,
            "title":"6: Mom love you",
            "name":"Mom love you",
            "code":"MLY",
            "latitude":2,
            "longitude":2,
            "image":"",
            "promotion":true,
            "vacancyCount":0,
            "vacancyStatus":"Full"
          },
          {
            "post_id":242,
            "title":"7: Mother care",
            "name":"Mother care",
            "code":"MC",
            "latitude":1,
            "longitude":1,
            "image":"",
            "promotion":true,
            "vacancyCount":0,
            "vacancyStatus":"Full"
          },
          {
            "post_id":245,
            "title":"8: New Life As Mom",
            "name":"New Life",
            "code":"NL",
            "latitude":2,
            "longitude":2,
            "image":"",
            "promotion":true,
            "vacancyCount":10,
            "vacancyStatus":"Vacancies"
          },
          {
            "post_id":238,
            "title":"9: Alarm Centre Title A MOM",
            "name":"Alarm Centre C",
            "code":"ALC",
            "latitude":1,
            "longitude":1,
            "image":"",
            "promotion":true,
            "vacancyCount":2,
            "vacancyStatus":"Limited"
          },
          {
            "post_id":251,
            "title":"10: Mom love you",
            "name":"Mom love you",
            "code":"MLY",
            "latitude":2,
            "longitude":2,
            "image":"",
            "promotion":true,
            "vacancyCount":0,
            "vacancyStatus":"Full"
          },
          {
            "post_id":242,
            "title":"11: Mother care",
            "name":"Mother care",
            "code":"MC",
            "latitude":1,
            "longitude":1,
            "image":"",
            "promotion":true,
            "vacancyCount":0,
            "vacancyStatus":"Full"
          },
          {
            "post_id":245,
            "title":"12: New Life As Mom",
            "name":"New Life",
            "code":"NL",
            "latitude":2,
            "longitude":2,
            "image":"",
            "promotion":true,
            "vacancyCount":10,
            "vacancyStatus":"Vacancies"
          },
          {
            "post_id":238,
            "title":"13: Alarm Centre Title A MOM",
            "name":"Alarm Centre C",
            "code":"ALC",
            "latitude":1,
            "longitude":1,
            "image":"",
            "promotion":true,
            "vacancyCount":2,
            "vacancyStatus":"Limited"
          },
          {
            "post_id":9,
            "title":"14: Mom love you",
            "name":"Mom love you",
            "code":"MLY",
            "latitude":2,
            "longitude":2,
            "image":"",
            "promotion":true,
            "vacancyCount":0,
            "vacancyStatus":"Full"
          },
          {
            "post_id":9,
            "title":"15: Mother care",
            "name":"Mother care",
            "code":"MC",
            "latitude":1,
            "longitude":1,
            "image":"",
            "promotion":true,
            "vacancyCount":0,
            "vacancyStatus":"Full"
          },
          {
            "post_id":10,
            "title":"16: New Life As Mom",
            "name":"New Life",
            "code":"NL",
            "latitude":2,
            "longitude":2,
            "image":"",
            "promotion":true,
            "vacancyCount":10,
            "vacancyStatus":"Vacancies"
          }
        ],
        "itemCount":16,
        "latitude":1.112,
        "longitude":1.112,
        "page":param.page,
        "pageSize":param.pageSize,
        "pageCount": 2,
        "sortBy":"A-Z"
      };

      if (param.filters && param.filters.areas) {
        param.filters.areas.forEach((area) => {
          const checkArea = result.filters.areas.filter(item => item.id.toString() === area.toString());
          if (checkArea.length) {
            checkArea[0].isSelected = true;
          }
        });
      }

      if (param.filters && param.filters.districts) {
        param.filters.districts.forEach((dist, i) => {
          result.filters.districts[i].isSelected = false;
          const checkDistricts = result.filters.districts.filter(item => item.id.toString() === dist.toString());
          if (checkDistricts.length) {
            checkDistricts[0].isSelected = true;
          }
        });
      }

      if (param.filters && param.filters.name) {
        result.filters.name = param.filters.name;
      }

      if (param.filters && 'vacancy' in param.filters) {
        result.filters.vacancy = param.filters.vacancy;
      }

      if (param.filters && 'promotion' in param.filters) {
        result.filters.promotion = param.filters.promotion;
      }

      const newItems = result.items.slice((result.page - 1)*(result.pageSize), (result.page)*(result.pageSize));
      result.items = newItems;

      return {
        data: result,
        status: 200,
        errorMessage: null,
        errorCode: 0
      };
    }

    function submitRegister(param) {
      return {
        data: { ...param },
        status: 200,
        errorMessage: null,
        errorCode: 0,
      };
    }
  };

  window.APICaller = window.APICaller || {};
  window.APICaller = new APICaller();
})(jQuery);
