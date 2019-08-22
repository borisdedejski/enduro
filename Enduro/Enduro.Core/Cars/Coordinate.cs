using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Core.Cars
{
    public class Coordinate
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Coordinate(double latitude, double longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }
        //public double _latitude = 0;
        //public double Latitude
        //{
        //    get => _latitude;
        //    set => _latitude = ((value < -90) || (value > 90)) ? 0 : value;
        //}
        //public double _longitude = 0;
        //public double Longitude
        //{
        //    get => _longitude;
        //    set => _longitude = ((value < -180) || (value > 180)) ? 0 : value;
        //}

    }
}
