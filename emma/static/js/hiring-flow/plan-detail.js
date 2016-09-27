angular.module('emmaHiringFlow')
  .controller('planDetailController', function ($scope, $filter) {
    $scope.plan = {
      allowsWorkshops: false,
      allowsActivities: false,
      workshops: [],
      activities: [],
      maxMonthlyHours: 0,
      maxWeeklySessions: 0,
      sessionNumbers: []
    };

    $scope.mergedLists = [];

    $scope.schedules = [
      {
        htmlValue: '9:00',
        text: '9:00 AM'
      },
      {
        htmlValue: '10:00',
        text: '10:00 AM'
      },
      {
        htmlValue: '11:00',
        text: '11:00 AM'
      },
      {
        htmlValue: '12:00',
        text: '12:00 PM'
      },
      {
        htmlValue: '13:00',
        text: '1:00 PM'
      },
      {
        htmlValue: '14:00',
        text: '2:00 PM'
      },
      {
        htmlValue: '15:00',
        text: '3:00 PM'
      },
      {
        htmlValue: '16:00',
        text: '4:00 PM'
      },
      {
        htmlValue: '17:00',
        text: '5:00 PM'
      },
      {
        htmlValue: '18:00',
        text: '6:00 PM'
      },
      {
        htmlValue: '19:00',
        text: '7:00 PM'
      },
      {
        htmlValue: '20:00',
        text: '8:00 PM'
      }
    ];

    $scope.sessions = [
      {
        dayName: 'Lunes',
        htmlValue: 'monday',
        selected: false,
        disabled: false,
        initialHour: '',
        duration: 0,
        selectedWorkshop: ''
      },
      {
        dayName: 'Martes',
        htmlValue: 'tuesday',
        selected: false,
        disabled: false,
        initialHour: '',
        duration: 0,
        selectedWorkshop: ''
      },
      {
        dayName: 'Miércoles',
        htmlValue: 'wednesday',
        selected: false,
        disabled: false,
        initialHour: '',
        duration: 0,
        selectedWorkshop: ''
      },
      {
        dayName: 'Jueves',
        htmlValue: 'thursday',
        selected: false,
        disabled: false,
        initialHour: '',
        duration: 0,
        selectedWorkshop: ''
      },
      {
        dayName: 'Viernes',
        htmlValue: 'friday',
        selected: false,
        disabled: false,
        initialHour: '',
        duration: 0,
        selectedWorkshop: ''
      },
      {
        dayName: 'Sábado',
        htmlValue: 'saturday',
        selected: false,
        disabled: false,
        initialHour: '',
        duration: 0,
        selectedWorkshop: ''
      },
      {
        dayName: 'Domingo',
        htmlValue: 'sunday',
        selected: false,
        disabled: false,
        initialHour: '',
        duration: 0,
        selectedWorkshop: ''
      }
    ];

    $scope.init = function (allowsWorkshops, allowsActivities, maxMonthlyHours, maxWeeklySessions) {
      $scope.plan.allowsWorkshops = allowsWorkshops;
      $scope.plan.allowsActivities = allowsActivities;
      $scope.plan.maxMonthlyHours = maxMonthlyHours;
      $scope.plan.maxWeeklySessions = maxWeeklySessions;
      $scope.generateLists();
    };

    $scope.generateLists = function () {
      var i;
      if ($scope.plan.allowsWorkshops) {
        angular.forEach(angular.element('[data-workshop-name]'), function (elem) {
          $scope.plan.workshops.push({
            id: $scope.plan.workshops.length + 1,
            name: angular.element(elem).attr('data-workshop-name'),
            isSelected: false
          });
        });
      }
      if ($scope.plan.allowsActivities) {
        angular.forEach(angular.element('[data-activity-name]'), function (elem) {
          $scope.plan.activities.push({
            id: $scope.plan.activities.length + 1,
            name: angular.element(elem).attr('data-activity-name'),
            isSelected: false
          });
        });
      }
      for (i = 1; i <= $scope.plan.maxWeeklySessions; i++) {
        $scope.plan.sessionNumbers.push({
          value: i,
          text: i + (i == 1 ? ' hora' : ' horas')
        });
      }
    };

    $scope.getHoursLeft = function () {
      var selectedDays = $filter('filter')($scope.sessions, {selected: true});
      var usedHours = 0;
      angular.forEach(selectedDays, function(element) {
        usedHours += element.duration;
      });
      return ($scope.plan.maxMonthlyHours / 4) - usedHours;
    };

    $scope.mergeLists = function () {
      $scope.mergedLists = $filter('filter')($scope.plan.workshops.concat($scope.plan.activities),
          {isSelected: true});
    };

    $scope.disableDays = function (day) {
      var selectedDays = $filter('filter')($scope.sessions, {selected: true});
      var totalHours = 0;
      var validDuration = $scope.getHoursLeft() >= 0;
      var checkDays = true;
      angular.forEach(selectedDays, function (element) {
        if ((element.duration == 0 || element.duration == null) 
            && day !== element) {
          checkDays = false;
        }
      });
      if (checkDays && validDuration) {
        if (selectedDays.length >= $scope.plan.maxWeeklySessions) {
          $scope.sessions = angular.forEach($scope.sessions, function (element) {
            if (!element.selected) {
              element.disabled = true;
            }
          });
        } else {
          angular.forEach(selectedDays, function (element) {
            totalHours += element.duration;
          });
          if (totalHours * 4 >= $scope.plan.maxMonthlyHours) {
            $scope.sessions = angular.forEach($scope.sessions, function (element) {
              if (!element.selected) {
                element.disabled = true;
              }
            });
          } else {
            $scope.sessions = angular.forEach($scope.sessions, function (element) {
              element.disabled = false;
            });
          }
        }
      } else {
        if (!validDuration) {
          console.log('Parece que te excederas de las horas permitidas en tu plan.');
          day.duration = 0;
        }
        if (!checkDays) {
          console.log('Antes de elegir un nuevo día, completa la información del anterior!');
          day.selected = false;
        }
      }
    };
  });