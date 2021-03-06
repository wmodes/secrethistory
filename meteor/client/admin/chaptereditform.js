// Secret History of American River People
// Chapter Renderer

// Version 0.9

/*
 
   Copyright (c) 2015 Wes Modes (http://modes.io)
   This content is released under the GNU General Public License, 
   version 3 (GPL-3.0). More info at 
   http://opensource.org/licenses/GPL-3.0

   See package license information in license.js

*/


Template.chaptereditform.rendered = function(){

  debug = true;

  chapterURL = "/chapter/";
  chapterEditorURL = "/admin/chapter/";

  changedFlag = false;
  setConfirmUnload(false);

  // Initialize the editor with a JSON schema
  jsonEditor = new JSONEditor(document.getElementById('editor_holder'), {

    "theme": "bootstrap3",
    "iconlib": "fontawesome4",
    "required_by_default": true,

    "schema": {
      "id": "chapter",
      "type": "object",
      "title": "Chapter",
      "description": "This defines a single chapter",
      "name": "chapter",
      "format": "grid",
      "properties": {
        "pathNumber": {
          "id": "pathNumber",
          "type": "integer",
          "minimum": 0,
          "title": "Path Number",
          "name": "path Number"
        },
        "pathName": {
          "id": "pathName",
          "type": "string",
          "minLength": 0,
          "title": "Path Name",
          "name": "path Name"
        },
        "chapterNumber": {
          "id": "chapterNumber",
          "type": "integer",
          "minimum": 0,
          "title": "Chapter Number",
          "name": "chapter Number"
        },
        "chapterName": {
          "id": "chapterName",
          "type": "string",
          "minLength": 0,
          "title": "Chapter Name",
          "name": "chapter Name"
        },
        "slug": {
          "id": "slug",
          "type": "string",
          "minLength": 0,
          "title": "Slug",
          "description": "Slug for URL",
          "name": "slug"
        },
        "description": {
          "id": "description",
          "type": "string",
          "minLength": 0,
          "title": "Public Description",
          "description": "This is a public description for your chapter. Make it dynamic, exciting, and interesting.",
          "name": "description",
          "format": "textarea",
          "options": {
            "expand_height": true
          }
        },
        "featureContent": {
          "id": "featureContent",
          "type": "string",
          "minLength": 0,
          "title": "Feature Image/Video",
          "description": "Filename of feature to be used when linking to this chapter",
          "name": "featureContent",
          "links": [
            {
              "href": "/thumbs/{{self}}.jpg",
              "mediaType": "image/jpg"
            }
          ]
        },
        "release": {
          "id": "release",
          "type": "boolean",
          "format": "checkbox",
          "title": "Release",
          "description": "Is this chapter finished and ready for release?",
          "name": "release",
          "default": "false"
        },
        "testing": {
          "id": "testing",
          "type": "boolean",
          "format": "checkbox",
          "title": "Testing",
          "description": "Is this chapter only for testing purposes?",
          "name": "testing",
          "default": "false"
        },
        "debug": {
          "id": "debug",
          "type": "boolean",
          "format": "checkbox",
          "title": "Debugging Output",
          "description": "Do we output debugging info during testing for this chapter?",
          "name": "debug",
          "default": "false"
        },
        "placeholders": {
          "id": "placeholders",
          "type": "boolean",
          "format": "checkbox",
          "title": "Placeholders",
          "description": "If images or video are missing or blank, do we replace with placeholders?",
          "name": "placeholders",
          "default": "true"
        },
        "ambientAudio": {
          "type": "object",
          "title": "Ambient Audio",
          "description": "(Optional) Ambient audio loop that will play during the entire chapter",
          "format": "grid",
          "options": {
            "collapsed": true,
            "disable_edit_json": true,
            "disable_properties": true,
            "grid_columns": 2
          },
          "properties": {
            "audioContent": {
              "id": "audioContent",
              "type": "string",
              "title": "Audio Content",
              "description": "Filename of audio file",
              "name": "audio Content",
              "links": [
                {
                  "href": "/audio/{{self}}",
                  "mediaType": "audio/mp3"
                }
              ]
            },
            "volume": {
              "id": "volume",
              "type": "number",
              "title": "Volume",
              "description": "Volume [0-1]",
              "name": "start Volume",
              "minimum": 0,
              "maximum": 1,
              "default": 1
            }
          }
        },

        "scenes": {
          "id": "scenes",
          "type": "array",
          "minItems": 1,
          "uniqueItems": false,
          "additionalItems": true,
          "title": "Scenes",
          "description": "Here are the scenes within this chapter",
          "name": "scenes",
          "items": {
            "id": "0",
            "type": "object",
            "additionalProperties": true,
            "title": "Scene",
            "name": "0",
            "format": "grid",
            "options": {
              "disable_edit_json": true,
              "disable_properties": true,
              "grid_columns": 2
            },
            "properties": {
              "sceneNumber": {
                "id": "sceneNumber",
                "type": "integer",
                "multipleOf": 1,
                "minimum": 0,
                "title": "Scene Number",
                "name": "scene Number"
              },
              "sceneName": {
                "id": "sceneName",
                "type": "string",
                "minLength": 0,
                "title": "Scene Name",
                "name": "scene Name"
              },

              "shots": {
                "id": "shots",
                "type": "array",
                "minItems": 1,
                "additionalItems": true,
                "title": "Shots",
                "description": "Here are the shots within this scene",
                "name": "shots",
                "items": {
                  "id": "0",
                  "type": "object",
                  "additionalProperties": true,
                  "title": "Shot",
                  "name": "0",
                  "format": "grid",
                  "options": {
                    "grid_columns": 2
                  },
                  "properties": {

                    "shotNumber": {
                      "id": "shotNumber",
                      "type": "integer",
                      "multipleOf": 1,
                      "minimum": 0,
                      "title": "Shot Number",
                      "name": "shot Number"
                    },
                    "shotContent": {
                      "id": "shotContent",
                      "type": "string",
                      "minLength": 0,
                      "title": "Shot Content",
                      "description": "Filename of shot",
                      "name": "Shot Content",
                      "links": [
                        {
                          "href": "/thumbs/{{self}}.jpg",
                          "mediaType": "image/jpg"
                        }
                      ]
                    },
                    "shotType": {
                      "id": "shotType",
                      "type": "string",
                      "minLength": 0,
                      "title": "Shot Type",
                      "description": "What type of visual element is this?",
                      "enum": [
                        "still",
                        "video"
                      ],
                      "name": "shot Type"
                    },
                    "shotDuration": {
                      "id": "shotDuration",
                      "type": "number",
                      "minimum": 0,
                      "title": "Shot Duration",
                      "description": "How long is shot? [winUnits, default: 0.3]",
                      "name": "shotDuration",
                      "default": 0.3
                    },
                    "sticky": {
                      "id": "sticky",
                      "type": "boolean",
                      "format": "checkbox",
                      "format": "checkbox",
                      "title": "Sticky",
                      "description": "Stays visible when page scrolls?",
                      "name": "Sticky",
                      "default": true
                    },
                    "transitionType": {
                      "id": "transitionType",
                      "type": "string",
                      "minLength": 0,
                      "title": "Transition Type",
                      "description": "What type of transition is this?",
                      "enum": [
                        "push",
                        "cut",
                        "dissolve",
                        "fade",
                        "flare",
                        "wipe",
                        "pan",
                        "split",
                        "focus",
                        "animate"
                      ],
                      "name": "transition Type"
                    },
                    
                    "videoOptions": {
                      "type": "object",
                      "title": "Video Options",
                      "description": "Set these video options for type 'video' (Click the expand arrow above)",
                      "format": "grid",
                      "options": {
                        "collapsed": true,
                        "grid_columns": 2
                      },
                      "properties": {
                        "videoLoop": {
                          "id": "videoLoop",
                          "type": "boolean",
                          "format": "checkbox",
                          "title": "Loop",
                          "description": "Loop this video?",
                          "name": "Video Loop",
                          "default": false
                        },
                        "volume": {
                          "id": "volume",
                          "type": "number",
                          "title": "Volume",
                          "description": "Volume of video [0-1]",
                          "name": "Volume",
                          "minimum": 0,
                          "maximum": 1,
                          "default": 1
                        },
                        "startTrigger": {
                          "id": "startTrigger",
                          "type": "number",
                          "title": "Start Trigger",
                          "description": "Relative to start of shot (winUnits. 0=start, 0.5=half. Can be negative)",
                          "name": "start Trigger",
                          "default": -1
                        },
                        "duration": {
                          "id": "duration",
                          "type": "number",
                          "title": "Duration",
                          "description": "Duration of shot (winUnits. 0.5=half, 2=two screens)",
                          "name": "Duration",
                          "minimum": 0,
                          "default": 2
                        }
                      }
                    },

                    "audioElements": {
                      "id": "audioElements",
                      "type": "array",
                      "minItems": 0,
                      "title": "Audio Elements",
                      "description": "Audio elements for this shot (Click +Audio Element button below to add)",
                      "name": "audio Elements",
                      "items": {
                        "id": "0",
                        "type": "object",
                        "title": "Audio Element",
                        "name": "0",
                        "format": "grid",
                        "options": {
                          "grid_columns": 2
                        },
                        "properties": {
                          "audioContent": {
                            "id": "audioContent",
                            "type": "string",
                            "title": "Audio Content",
                            "description": "Filename of audio file",
                            "name": "audio Content",
                            "links": [
                              {
                                "href": "/audio/{{self}}",
                                "mediaType": "audio/mp3"
                              }
                            ]
                          },
                          "audioLoop": {
                            "id": "audioLoop",
                            "type": "boolean",
                            "format": "checkbox",
                            "title": "Audio Loop",
                            "description": "Should this audio be looped?",
                            "name": "Audio Loop",
                            "default": true
                          },
                          "startTrigger": {
                            "id": "startTrigger",
                            "type": "number",
                            "title": "Start Trigger",
                            "description": "Relative to start of shot (winUnits. 0=start, 0.5=half. Can be negative)",
                            "name": "start Trigger",
                            "default": -1
                          },
                          "duration": {
                            "id": "duration",
                            "type": "number",
                            "title": "Duration",
                            "description": "Duration of shot (winUnits. 0.5=half, 2=two screens)",
                            "name": "Duration",
                            "minimum": 0,
                            "default": 2
                          },
                          "volume": {
                            "id": "volume",
                            "type": "number",
                            "title": "Volume",
                            "description": "Volume of audio element [0-1]",
                            "name": "Volume",
                            "minimum": 0,
                            "maximum": 1,
                            "default": 1
                          },
                          "fadeIn": {
                            "id": "fadeIn",
                            "type": "boolean",
                            "format": "checkbox",
                            "title": "Fade In/Out",
                            "description": "Should this audio element fade in/out?",
                            "name": "fade In/Out",
                            "default": true
                          }
                        },
                        "required": [
                          "audioContent",
                          "audioLoop",
                          "startTrigger",
                          "duration",
                          "volume",
                          "fadeIn"
                        ]
                      }
                    },

                    "visualElements": {
                      "id": "visualElements",
                      "type": "array",
                      "minItems": 0,
                      "title": "Visual Elements",
                      "description": "Visual elements for this shot (Click +Visual Element button below to add)",
                      "name": "visual Elements",
                      "items": {
                        "id": "0",
                        "type": "object",
                        "title": "Visual Element",
                        "name": "0",
                        "format": "grid",
                        "options": {
                          "grid_columns": 2
                        },
                        "properties": {
                          "visualContent": {
                            "id": "visualContent",
                            "type": "string",
                            "format": "textarea",
                            "links": [
                              {
                                "href": "/thumbs/{{self}}.jpg",
                                "mediaType": "image/jpg"
                              }
                            ],
                            "options": {
                              "expand_height": true,
                              "input_height": "24pt"
                            },
                            "minLength": 0,
                            "title": "Visual Content",
                            "description": "Filename or HTML",
                            "name": "visual Content"
                          },
                          "visualType": {
                            "id": "visualType",
                            "type": "string",
                            "minLength": 0,
                            "title": "Visual Type",
                            "description": "What type of visual element is this?",
                            "enum": [
                              "still",
                              "html"
                            ],
                            "name": "element Type"
                          },
                          "fullscreen": {
                            "id": "fullscreen",
                            "type": "boolean",
                            "format": "checkbox",
                            "title": "Fullscreen",
                            "description": "Should this image be stretched fullscreen like the background?",
                            "name": "Fullscreen",
                            "default": 0
                          },
                          "zIndex": {
                            "id": "zIndex",
                            "type": "number",
                            "title": "Z-Index",
                            "description": "Depth level - pos numbers move forward, neg move back",
                            "name": "Z-Index",
                            "default": 0
                          },
                          "cssBase": {
                            "id": "cssBase",
                            "type": "string",
                            "format": "textarea",
                            "options": {
                              "expand_height": true
                            },
                            "title": "Starting CSS",
                            "description": "Starting css of containing div (for position, size, scale, opacity, etc.)",
                            "name": "css Base"
                          },
                          "transitions": {
                            "id": "transitions",
                            "type": "array",
                            "minItems": 0,
                            "title": "Transitions",
                            "description": "Transitions for this element (Click +Transition button below to add)",
                            "name": "transitions",
                            "items": {
                              "id": "0",
                              "type": "object",
                              "title": "Transition",
                              "description": "Transion for this visual element",
                              "name": "0",
                              "format": "grid",
                              "options": {
                                "grid_columns": 2
                              },
                              "properties": {
                                "transitionType": {
                                  "id": "transitionType",
                                  "type": "string",
                                  "minLength": 0,
                                  "title": "Transition Type",
                                  "description": "What type of transition is this?",
                                  "enum": [
                                    "push",
                                    "cut",
                                    "fade",
                                    "flare",
                                    "wipe",
                                    "cut",
                                    "pan",
                                    "split",
                                    "focus",
                                    "animate"
                                  ],
                                  "name": "transition Type"
                                },
                                "startTrigger": {
                                  "id": "startTrigger",
                                  "type": "number",
                                  "title": "Start Trigger",
                                  "description": "Relative to start of shot (winUnits. 0=start, 0.5=half. Can be negative)",
                                  "name": "start Trigger",
                                  "default": -1
                                },
                                "duration": {
                                  "id": "duration",
                                  "type": "number",
                                  "title": "Duration",
                                  "description": "Duration of transition (winUnits. 0.5=half, 2=two screens)",
                                  "name": "Duration",
                                  "minimum": 0,
                                  "default": 2
                                },
                                "cssEnd": {
                                  "id": "cssEnd",
                                  "type": "string",
                                  "format": "textarea",
                                  "options": {
                                    "expand_height": true
                                  },
                                  "expand_height": true,
                                  "title": "Ending CSS",
                                  "description": "CSS of containing div at end of transition (for position, size, scale, opacity, etc.)",
                                  "name": "css End"
                                }
                              },
                              "required": [
                                "transitionType",
                                "startTrigger",
                                "duration",
                                "cssEnd"
                              ]
                            }
                          }
                        },
                        "required": [
                          "visualContent",
                          "visualType",
                          "fullscreen",
                          "zIndex",
                          "cssBase",
                          "transitions"
                        ]
                      }
                    }

                  },
                  "required": [
                    "shotNumber",
                    "shotContent",
                    "shotType",
                    "shotDuration",
                    "sticky",
                    "transitionType",
                    "videoOptions",
                    "audioElements",
                    "visualElements"
                  ]

                }
              }
            },
            "required": [
              "sceneNumber",
              "sceneName",
              "shots"
            ]
          }
        },

        "links": {
          "id": "scenes",
          "type": "array",
          "minItems": 0,
          "maxItems": 4,
          "uniqueItems": false,
          "additionalItems": true,
          "title": "Chapter Links",
          "description": "Related links to other chapters, starting with the link to the next chapter in this path",
          "options": {
            "collapsed": false,
            "disable_properties": true
          },
          "items": {
            "id": "0",
            "type": "object",
            "additionalProperties": true,
            "title": "Link",
            "name": "0",
            "format": "grid",
            "options": {
              "disable_edit_json": true,
              "disable_properties": true,
              "grid_columns": 2
            },
            "properties": {
              "pathNumber": {
                "id": "pathNumber",
                "type": "integer",
                "minimum": 0,
                "title": "Path Number",
                "name": "path Number"
              },
              "chapterNumber": {
                "id": "chapterNumber",
                "type": "integer",
                "minimum": 0,
                "title": "Chapter Number",
                "name": "chapter Number"
              },
              "pathName": {
                "id": "pathName",
                "type": "string",
                "minimum": 0,
                "title": "Path Name",
                "name": "pathName"
              },
              "chapterName": {
                "id": "chapterName",
                "type": "string",
                "minimum": 0,
                "title": "Chapter Name",
                "name": "chapterName"
              },
              "description": {
                "id": "description",
                "type": "string",
                "format": "textarea",
                "minimum": 0,
                "title": "Description",
                "name": "description"
              },
              "slug": {
                "id": "slug",
                "type": "string",
                "minimum": 0,
                "title": "Chapter Slug",
                "name": "slug"
              }
            }
          }
        }
      },

      "required": [
        "pathNumber",
        "pathName",
        "chapterNumber",
        "chapterName",
        "slug",
        "description",
        "featureContent",
        "debug",
        "release",
        "testing",
        "placeholders",
        "ambientAudio",
        "scenes",
        "links"
      ]
    }

  });

  // DATA STUFF

  // Params from URL
  //
  routerParams = Router.current().params;
  var pathNum = parseInt(routerParams.pathNum);
  var chapterNum = parseInt(routerParams.chapterNum);
  //console.log("Template created for p"+pathNum+"c"+chapterNum);
  if (pathNum && chapterNum) {
    console.log("Template created for p"+pathNum+"c"+chapterNum);
    getEditChapter(pathNum, chapterNum);
  }

  //TODO: Important: Make sure safeties are added to JSON edit button - right now, you can clobber an entire chapter by uploading JSON from another chapter which is then saved with the old ID.


  // Search Button
  //
  $(".search-button").click(function() {
    if (changedFlag && !confirmBonk()) {
      return false;
    }
    // Get the value from the editor
    pathNum = parseInt($("#path-num").val());
    chapterNum = parseInt($("#chapter-num").val());
    if (debug) {
      console.log("PathNumber: "+pathNum+" ChapterNumber: "+chapterNum);
    }
    getEditChapter(pathNum, chapterNum);
  });

  function getEditChapter(pathNum, chapterNum) {
    pathNum = parseInt(pathNum);
    chapterNum = parseInt(chapterNum);
    // Get chapter from collection
    var myChapter = getChapterCollection(pathNum, chapterNum);
    if (debug) console.log(myChapter);
    // if search results are positive
    if (myChapter) {
      // get the document id assigned by mongo
      var id = myChapter._id;
      // if the id is an object, the id string is _id._str. Why? Not sure.
      if (typeof id == "object") {
        if (typeof id._str == "string") {
          id = id._str;
        }
      }
      // separate the id from the document, otherwise we can't update
      delete myChapter._id;
      $("#search-results").html("<span class='info'>Chapter retreived: "+id+"</span>");
      // make the pathNum and chapterNum readonly
      protectIndexNumbers();
      // write the object to the json editor
      jsonEditor.setValue(myChapter);
      // write id to the session
      Session.set('current_id', id);
      Session.set('pathNum', pathNum);
      Session.set('chapterNum', chapterNum);
      changeURL(pathNum, chapterNum);
      addRefreshButtons();
      populateAllLinks();
    } else {
      $("#search-results").html("<span class='error'>Chapter not found.</span>");
    }
  }

  // New Button
  //
  $(".new-button").click(function() {
    if (changedFlag && !confirmBonk()) {
      return false;
    }
    // Reset to all dafaults - but how?
    jsonEditor.setValue();
    // make the pathNum and chapterNum not readonly
    unprotectIndexNumbers();
    // remove saved id
    Session.set('current_id', null);
    Session.set('pathNum', null);
    Session.set('chapterNum', null);
    changeURL(null, null);
    // clear search fields
    $("#path-num").val(null)
    $("#chapter-num").val(null)
    $("#search-results").html("<span class='info'>New chapter. Save frequently.</span>");
    $("div [data-schemapath='root.pathNumber'] input").focus();
    setTimeout(function() {
      protectLinkInfo(0);
    }, 1000);
  });

  function protectIndexNumbers() {
    // make fields readonly
    $("div [data-schemapath='root.pathNumber'] input").attr("readonly", true);
    $("div [data-schemapath='root.chapterNumber'] input").attr("readonly", true);
  }

  function unprotectIndexNumbers() {
    // make fields not readonly
    $("div [data-schemapath='root.pathNumber'] input").attr("readonly", false);
    $("div [data-schemapath='root.chapterNumber'] input").attr("readonly", false);
  }

  function changeURL(pathNum, chapterNum) {
    if (pathNum && chapterNum) {
      var newPath = chapterEditorURL + pathNum.toString() + '/' + chapterNum.toString() + '/';
      var newTitle = "Chapter Edit: p" + pathNum.toString() + "c" + chapterNum.toString() 
          + ": SecretHistory";
    } else {
      var newPath = chapterEditorURL;
      var newTitle = "Chapter Edit: SecretHistory";
    }
    var state = {
      "thisIsOnPopState": true
    };
    window.history.pushState(state, newTitle, newPath);
    document.title = newTitle;
  }

  // Submit Button
  //
  $(".submit-button").click(function() {
    saveChapterCollection()
  });

  // Submit Button
  //
  $(".preview-button").click(function() {
    if (changedFlag) {
      saveChapterCollection();
    }
    urlBase = document.URL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6}|:[0-9]{3,4})\b/)[0];
    url = urlBase + chapterURL + jsonEditor.getEditor('root.slug').getValue();
    var myWindow = window.open(url, '_preview');
    myWindow.focus();
  });

  // COLLECTIONS

  function getChapterCollection(pathNum, chapterNum) {
    pathNum = parseInt(pathNum);
    chapterNum = parseInt(chapterNum);
    var item = ChapterCollection.findOne({
      pathNumber: pathNum,
      chapterNumber: chapterNum
    });
    if(typeof item == 'undefined'){
      return null;
    }
    else{
      return item;
    }
  };

  function saveChapterCollection() {
    // get current document from form editor
    var myChapter = jsonEditor.getValue();
    // get id if we have one
    myid = Session.get('current_id');
    if (debug) {
      console.log(myChapter);
      console.log(myid);
    }
    if (!(myChapter.pathNumber && myChapter.chapterNumber)) {
      bootbox.alert({
        title: "Not Saved",
        message:
          "<h3>Chapter not saved</h3>"+
          "You need to set the Path Number and Chapter Number before it can be saved."
      });
      return;
    }
    // if we have an id, then this in an update
    if (myid) {
      ChapterCollection.update(myid, { 
        $set: myChapter
      });
    // if we don't have an id, this is an insert
    } else {
      console.log("This is new chapter. Testing for conflict");
      // Make sure we are not overwriting an existing record
      if (getChapterCollection(myChapter.pathNumber,myChapter.chapterNumber)) {
        console.log("Conflict found in database");
        // alert about conflict
        reportConflict(myChapter.pathNumber, myChapter.pathName,
          myChapter.chapterNumber, myChapter.chapterName);
        return;
      } else {
        console.log("No conflict found in database");
        // SAVE
        // insert document in collection and save returned id
        myid = ChapterCollection.insert(myChapter);
        Session.set('current_id', myid);
        console.log("Saved as new: "+myid);
        // Make pathNumber and chapterNUmber readonly
        protectIndexNumbers();
      }
    }
    changedFlag = false;
    setConfirmUnload(false);
    bootbox.alert({
      title: "Saved",
      message:
        "<h3>Chapter saved</h3><br>"+
        "Path Number: "+myChapter.pathNumber+" "+myChapter.pathName+"<br>"+
        "Chapter Number: "+myChapter.chapterNumber+" "+myChapter.chapterName+"<br><br>"+
        "The chapter is recorded in the database."
    });
  };

  function makeSafeFilename(dirtyString) {
    return dirtyString.replace(/([^a-z0-9]+)/gi, '-').replace(/--*/g, '-').toLowerCase();
  }

  function checkConflict(pathNum, chapterNum) {
    // First, we wouldn't be here if either pathNumber of chapterNumber weren't changed
    // If we don't have both, then we can't do anything, so return
    if (pathNum && chapterNum) {
      var chapter = getChapterCollection(pathNum, chapterNum);
      if (chapter) {
        reportConflict(pathNum, chapter.pathName, chapterNum, chapter.chapterName);
        return true;
      }
      Session.set('pathNum', pathNum);
      Session.set('chapterNum', chapterNum);
    }
    return false;
  }

  function reportConflict(pathNum, pathName, chapterNum, chapterName){
    bootbox.alert({
      title: "Conflict",
      message:
        "<span class='error'>"+
        "<h3>Chapter already exists</h3><br>"+
        "Path Number: "+pathNum+" "+pathName+"<br>"+
        "Chapter Number: "+chapterNum+" "+chapterName+"<br><br>"+
        "Cannot save. Search for this chapter instead."+
        "</span>"
    });
  }

  function confirmBonk(){
    //TODO: Make this a confirmation instead
    bootbox.alert({
      title: "Bonk Prevented",
      message:
        "<span class='error'>"+
        "<h3>Your data has been changed</h3><br>"+
        "This search would bonk your changed data, so we didn't do it."+
        "</span>"
    });
    return false;
  }
  
  // WATCH FIELDS

  // TODO: Make all these watchers that are attached to fields into a single function, so it can be triggered whenver new fields are added by new field buttons

  // Add confirmation before closing window
  // Flag changedFlag if any field is changed to prevent search from destroying data  
  // This won't cover fields that are currently not showing i.e. collapsed fields
  // but it is better than nothing
  function preventBonk () {
    changedFlag = true;
    setConfirmUnload(true);
    if (debug) {
      console.log("data changed; prevent bonk")
    }
  }

  $("#editor_holder input").change(function(){
    preventBonk();
  });

  // TODO: after creating the preventBonk function, is the tail of this still valid?
  $("div[data-schemaid='pathNumber'] input").change(function(){
    var pathNum = parseInt($(this).val());
    var chapterNum = parseInt($("div[data-schemaid='chapterNumber'] input").val());
    //TODO: Do something if there is a conflict
    if (! checkConflict(pathNum, chapterNum)) {
      preventBonk();
    }
  });

  // TODO: after creating the preventBonk function, is the tail of this still valid?
  $("div[data-schemaid='chapterNumber'] input").change(function(){
    var chapterNum = parseInt($(this).val());
    var pathNum = parseInt($("div[data-schemaid='pathNumber'] input").val());
    //TODO: Do something if there is a conflict
    if (! checkConflict(pathNum, chapterNum)) {
      preventBonk();
    }
  });

  $("div[data-schemapath='root.pathName'] input").change(function(){
    var pathName = $(this).val();
    var chapterName = $("div[data-schemapath='root.chapterName'] input").val();
    var slug = makeSafeFilename(pathName)+'/'+makeSafeFilename(chapterName);
    jsonEditor.getEditor('root.slug').setValue(slug)
  });

  $("div[data-schemapath='root.chapterName'] input").change(function(){
    var chapterName = $(this).val();
    var pathName = $("div[data-schemapath='root.pathName'] input").val();
    var slug = makeSafeFilename(pathName)+'/'+makeSafeFilename(chapterName);
    jsonEditor.getEditor('root.slug').setValue(slug)
  });


  // Extra info for links

  function populateOneLink(linkIndex) {
    pathNum = jsonEditor.getEditor('root.links.'+linkIndex+'.pathNumber').getValue();
    chapterNum = jsonEditor.getEditor('root.links.'+linkIndex+'.chapterNumber').getValue();
    console.log("populateOneLink: pathNum:"+pathNum+" chapterNum:"+chapterNum);
    if (pathNum && chapterNum) {
      var linkChapter = getChapterCollection(pathNum, chapterNum);
      if (linkChapter) {
        linkPathName = linkChapter.pathName;
        linkChapterName = linkChapter.chapterName;
        linkDescription = linkChapter.description;
        linkSlug = linkChapter.slug;
      } else {
        linkPathName = linkChapterName = linkSlug = "";
        linkDescription = "Not found... yet";
      }
    }
    jsonEditor.getEditor('root.links.'+linkIndex+'.pathName').setValue(linkPathName)
    jsonEditor.getEditor('root.links.'+linkIndex+'.chapterName').setValue(linkChapterName)
    jsonEditor.getEditor('root.links.'+linkIndex+'.description').setValue(linkDescription)
    jsonEditor.getEditor('root.links.'+linkIndex+'.slug').setValue(linkSlug)
  }

  function populateAllLinks() {
    linkLength = jsonEditor.getEditor('root.links').getValue().length;
    if (debug) {
      console.log("populateAllLinks:");
      console.log("There are "+linkLength+" links");
    }
    console.log("populateAllLinks:");
    console.log("There are "+linkLength+" links");
    for (linkIndex = 0; linkIndex < linkLength; linkIndex++) { 
      populateOneLink(linkIndex);
      addLinkWatcher(linkIndex);
      protectLinkInfo(linkIndex);
    }
  }

  setTimeout(function() {
    // Your code here
    $("button[title='Add Link']").click(function() {
      lastLink = jsonEditor.getEditor('root.links').getValue().length - 1;
      console.log("The link added is number " + lastLink);
      populateOneLink(lastLink);
      addLinkWatcher(lastLink);
      protectLinkInfo(lastLink);
    });
  }, 1000);

  function addLinkWatcher(linkIndex) {
    console.log("addLinkWatcher: Setting up watchers for link " + linkIndex);
    // set up watcher on the links.*.pathNumber field
    $("div[data-schemapath='root.links."+linkIndex+".pathNumber'] input").unbind();
    $("div[data-schemapath='root.links."+linkIndex+".pathNumber'] input").change(function(){
      // We set this manually because this gets triggered before it is written to form data
      jsonEditor.getEditor('root.links.'+linkIndex+'.pathNumber').setValue($(this).val());
      console.log("I just set the pathNumber after it was changed. I read it as "
        +jsonEditor.getEditor('root.links.'+linkIndex+'.pathNumber').getValue());
      populateOneLink(linkIndex);
    });
    // set up watcher on the links.*.chapterNumber field
    $("div[data-schemapath='root.links."+linkIndex+".chapterNumber'] input").unbind();
    $("div[data-schemapath='root.links."+linkIndex+".chapterNumber'] input").change(function(){
      // We set this manually because this gets triggered before it is written to form data
      jsonEditor.getEditor('root.links.'+linkIndex+'.chapterNumber').setValue($(this).val());
      console.log("I just set the chapterNumber after it was changed. I read it as "
        +jsonEditor.getEditor('root.links.'+linkIndex+'.chapterNumber').getValue());
      populateOneLink(linkIndex);
    });
  }

  // protect the fields that are only informational
  function protectLinkInfo(linkIndex) {
    console.log("protectLinkInfo: for link " + linkIndex);
    $("div[data-schemapath='root.links."+linkIndex+".pathName'] input").attr("readonly", true);
    $("div[data-schemapath='root.links."+linkIndex+".chapterName'] input").attr("readonly", true);
    $("div[data-schemapath='root.links."+linkIndex+".description'] textarea").attr("readonly", true);
    $("div[data-schemapath='root.links."+linkIndex+".slug'] input").attr("readonly", true);
  }

  // Refresh buttons

  addRefreshButtons();
  function addRefreshButtons() {
    // add a refresh button to image previews
    $("div.refresh-image").remove();
    $('a[href*="/thumbs/"]').after('<div class="refresh-image"><button class="refresh-image-button">Refresh</button></div>');
    // attach refresher to button
    $(".refresh-image-button").click(function() {
      refreshThumbnails();
    });
  }

  function refreshThumbnails() {
    $('img[src*="/thumbs/"]').each(function() {
      var src = $(this).attr('src');
      var newSrc = src.split('?',1)+'?'+Date.now()
      $(this).attr('src', newSrc);
    });
  }

  // Prevent accidental navigation away

  function setConfirmUnload(on)
  {
    window.onbeforeunload = on ? unloadMessage : null;
  }
  function unloadMessage()
  {
    return ('You have entered new data on this page. ' +
        'If you navigate away from this page without ' +
        'first saving your data, the changes will be lost.');
  }

  window.onerror = UnspecifiedErrorHandler;
  function UnspecifiedErrorHandler()
  {
    return true;
  }


  // if we select shot type video, uncollapse video options
  $("div[data-schemaid='shotType'] select").change(function(){
  //$("div[data-schemaid='shotType'] div select").on("change", function(){
    schemapath = $("div[data-schemapath$='shotType'] select")
      .parent().parent("div[data-schemapath$='shotType']")
      .attr('data-schemapath');
    schemapath=schemapath.replace("shotType","");
    console.log("changed. schemapath: "+schemapath);
    if(this.value === 'video') { 
      console.log("changed to video. schemapath: "+schemapath);
      $("div [data-schemapath='"+schemapath+"videoOptions'] div.well")
        .css("display", "block");
    }
    else { 
      console.log("changed to still. schemapath: "+schemapath);
      $("div [data-schemapath='"+schemapath+"videoOptions'] div.well")
        .css("display", "none");
    }
  });

  // pin upload form in view
  /*
  $(window).unbind("scroll");
  var uploadDiv = "#upload-wrapper";
  var uploadOffset = 30;
  $(window).scroll(function(e){ 
    var scrollPos = $(this).scrollTop();
    var uploadPos = $(uploadDiv).offset().top + uploadOffset;
    console.log("uploadPos:"+uploadPos+" scrollTop:"+scrollPos+" css:"+$el.css('position'));
    $el = $(uploadDiv); 
    if (scrollPos > uploadPos && $el.css('position') != 'fixed') { 
      $(uploadDiv).css({'position': 'fixed', 'top': '-'+uploadOffset+'px'}); 
    }
    if (scrollPos < uploadPos && $el.css('position') == 'fixed') {
      $(uploadDiv).css({'position': 'static', 'top': '-'+uploadOffset+'px'}); 
    } 
  });
  */

  // pin upload form in view
  var $window = $(window),
    $stickyEl = $('#upload-wrapper'),
    elTop = $stickyEl.offset().top;
  //add calculated width to css to fix it when it is free of its bounding box
  $stickyEl.css("width", $stickyEl.width()+"px");
  $window.scroll(function() {
    $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
  });

};

Template.chaptereditform.helpers({
  filestuff: function () {
    var filestuff = Session.get("filestuff");
    console.log(filestuff);
    return filestuff;
  }
});
