
export IMAGE_DIR="images"
export VIDEO_DIR="video"
export AUDIO_DIR="audio"
export THUMB_DIR="thumbs"
export UPLOAD_DIR=".upload"

export HANDBRAKE_OPTS=' -e x264  -q 20.0 -a 1,1 -E faac,copy:ac3 -B 160,160 -6 dpl2,none -R Auto,Auto -D 0.0,0.0 --audio-copy-mask aac,ac3,dtshd,dts,mp3 --audio-fallback ffac3 -f mp4 -4 --decomb --loose-anamorphic --modulus 2 -m --x264-preset medium --h264-profile high --h264-level 4.1 -O '

export IMAGEMAGICK_OPTS=' -quality 50 -resize 1920x1920 '

export VIDEO_THUMBNAIL_OPTS=' -s 500 '

export IMAGE_THUMBNAIL_OPTS=' -quality 50 -resize 500x500\> -flatten '

if [[ "`hostname`" =~ peoplesriverhistory ]] || [[  "`hostname`" =~ secrethistory ]]; then 

    export PUBLIC_FILES_DIR="/home/secrethistory/bundle/programs/web.browser/app"

else

    export PUBLIC_FILES_DIR="/Users/wmodes/dev/secrethistory/meteor/public"

fi
